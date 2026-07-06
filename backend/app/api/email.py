import re

from fastapi import APIRouter, Request, Query, HTTPException
from google.oauth2.credentials import Credentials

from pydantic import BaseModel

from google.oauth2.credentials import Credentials
from app.services.ai_service import AIService

from app.database.mongodb import emails
from app.services.gmail_service import GmailService

router = APIRouter()


# ==========================================================
# Gmail Message IDs (Testing)
# ==========================================================

@router.get("/gmail/ids")
async def get_gmail_ids(request: Request):

    creds = request.session.get("credentials")

    if not creds:
        raise HTTPException(
            status_code=401,
            detail="Please login first."
        )

    credentials = Credentials(
        token=creds["token"],
        refresh_token=creds["refresh_token"],
        token_uri=creds["token_uri"],
        client_id=creds["client_id"],
        client_secret=creds["client_secret"],
        scopes=creds["scopes"],
    )

    gmail = GmailService(credentials)

    ids = gmail.fetch_message_ids()

    return {
        "count": len(ids),
        "messages": ids,
    }


# ==========================================================
# Get Emails
# ==========================================================

@router.get("/emails")
async def get_emails(
    request: Request,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    label: str = Query("INBOX"),
):

    if "user_id" not in request.session:
        raise HTTPException(
            status_code=401,
            detail="Please login first."
        )

    google_id = request.session["user_id"]

    skip = (page - 1) * limit

    # --------------------------------------------
    # Build MongoDB Query
    # --------------------------------------------

    query = {
        "google_id": google_id
    }

    # Gmail Labels

    if label == "INBOX":
        query["labels"] = {"$in": ["INBOX"]}

    elif label == "SENT":
        query["labels"] = {"$in": ["SENT"]}

    elif label == "SPAM":
        query["labels"] = {"$in": ["SPAM"]}

    elif label == "TRASH":
        query["labels"] = {"$in": ["TRASH"]}

    elif label == "IMPORTANT":
        query["labels"] = {"$in": ["IMPORTANT"]}

    elif label == "UNREAD":
        query["is_read"] = False

    cursor = (
        emails.find(query)
        .sort("internal_date", -1)  
        .skip(skip)
        .limit(limit)
    )

    results = []

    async for email in cursor:
        email["_id"] = str(email["_id"])
        results.append(email)

    total = await emails.count_documents(query)

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "label": label,
        "emails": results,
    }

# ==========================================================
# Search Emails
# ==========================================================

@router.get("/emails/search")
async def search_emails(
    request: Request,
    q: str,
):

    if "user_id" not in request.session:
        raise HTTPException(
            status_code=401,
            detail="Please login first."
        )

    google_id = request.session["user_id"]

    regex = re.compile(q, re.IGNORECASE)

    cursor = emails.find(
        {
            "google_id": google_id,
            "$or": [
                {"sender": regex},
                {"subject": regex},
                {"snippet": regex},
            ],
        }
    ).sort("internal_date", -1)

    results = []

    async for email in cursor:
        email["_id"] = str(email["_id"])
        results.append(email)

    return {
        "count": len(results),
        "emails": results,
    }


# ==========================================================
# Get Single Email
# ==========================================================

@router.get("/emails/{gmail_id}")
async def get_email(
    gmail_id: str,
    request: Request,
):

    if "user_id" not in request.session:
        raise HTTPException(
            status_code=401,
            detail="Please login first."
        )

    google_id = request.session["user_id"]

    email = await emails.find_one(
        {
            "google_id": google_id,
            "gmail_id": gmail_id,
        }
    )

    if not email:
        raise HTTPException(
            status_code=404,
            detail="Email not found"
        )

    email["_id"] = str(email["_id"])

    return email


def get_credentials(request: Request) -> Credentials:
    creds = request.session.get("credentials")

    if not creds:
        raise HTTPException(status_code=401, detail="Please login first.")

    return Credentials(
        token=creds["token"],
        refresh_token=creds["refresh_token"],
        token_uri=creds["token_uri"],
        client_id=creds["client_id"],
        client_secret=creds["client_secret"],
        scopes=creds["scopes"],
    )


# ==========================================================
# Sync (manual refresh)
# ==========================================================

@router.post("/emails/sync")
async def sync_emails(request: Request, max_results: int = Query(20, ge=1, le=100)):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Please login first.")

    credentials = get_credentials(request)
    google_id = request.session["user_id"]

    gmail = GmailService(credentials)
    stored = await gmail.fetch_and_store_emails(google_id=google_id, max_results=max_results)

    return {"synced": len(stored)}


# ==========================================================
# Actions: read / star / archive / trash
# ==========================================================

@router.patch("/emails/{gmail_id}/read")
async def mark_read(gmail_id: str, request: Request, unread: bool = False):
    credentials = get_credentials(request)
    gmail = GmailService(credentials)

    gmail.mark_as_unread(gmail_id) if unread else gmail.mark_as_read(gmail_id)

    await emails.update_one(
        {"gmail_id": gmail_id, "google_id": request.session["user_id"]},
        {"$set": {"is_read": not unread}},
    )

    return {"success": True}


@router.patch("/emails/{gmail_id}/star")
async def toggle_star(gmail_id: str, request: Request, starred: bool = True):
    credentials = get_credentials(request)
    gmail = GmailService(credentials)

    gmail.star_message(gmail_id) if starred else gmail.unstar_message(gmail_id)

    await emails.update_one(
        {"gmail_id": gmail_id, "google_id": request.session["user_id"]},
        {"$set": {"is_starred": starred}},
    )

    return {"success": True}


@router.patch("/emails/{gmail_id}/archive")
async def archive_email(gmail_id: str, request: Request):
    credentials = get_credentials(request)
    gmail = GmailService(credentials)
    gmail.archive_message(gmail_id)

    await emails.update_one(
        {"gmail_id": gmail_id, "google_id": request.session["user_id"]},
        {"$pull": {"labels": "INBOX"}},
    )

    return {"success": True}


@router.delete("/emails/{gmail_id}")
async def trash_email(gmail_id: str, request: Request):
    credentials = get_credentials(request)
    gmail = GmailService(credentials)
    gmail.trash_message(gmail_id)

    await emails.update_one(
        {"gmail_id": gmail_id, "google_id": request.session["user_id"]},
        {"$addToSet": {"labels": "TRASH"}},
    )

    return {"success": True}


# ==========================================================
# Send: compose / reply / forward
# ==========================================================


class SendEmailRequest(BaseModel):
    to: str
    subject: str
    body: str
    thread_id: str | None = None
    in_reply_to: str | None = None


@router.post("/emails/send")
async def send_email(payload: SendEmailRequest, request: Request):
    credentials = get_credentials(request)
    gmail = GmailService(credentials)

    result = gmail.send_message(
        to=payload.to,
        subject=payload.subject,
        body=payload.body,
        thread_id=payload.thread_id,
        in_reply_to=payload.in_reply_to,
    )

    if not result:
        raise HTTPException(status_code=500, detail="Failed to send email")

    return {"success": True, "message_id": result.get("id")}


# ==========================================================
# AI: Summary + Smart Replies
# ==========================================================

@router.get("/emails/{gmail_id}/summary")
async def get_summary(gmail_id: str, request: Request):
    credentials = get_credentials(request)
    google_id = request.session["user_id"]

    email = await emails.find_one({"gmail_id": gmail_id, "google_id": google_id})
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    gmail = GmailService(credentials)
    message = gmail.fetch_message(gmail_id)
    body = gmail.get_full_body(message) if message else email["snippet"]

    summary = AIService.summarize_email(email["sender"], email["subject"], body)

    return {"summary": summary}


@router.get("/emails/{gmail_id}/smart-replies")
async def get_smart_replies(gmail_id: str, request: Request):
    credentials = get_credentials(request)
    google_id = request.session["user_id"]

    email = await emails.find_one({"gmail_id": gmail_id, "google_id": google_id})
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")

    gmail = GmailService(credentials)
    message = gmail.fetch_message(gmail_id)
    body = gmail.get_full_body(message) if message else email["snippet"]

    replies = AIService.generate_smart_replies(email["sender"], email["subject"], body)

    return {"replies": replies}


@router.get("/emails/counts")
async def get_counts(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Please login first.")

    google_id = request.session["user_id"]

    async def count(query):
        return await emails.count_documents({"google_id": google_id, **query})

    return {
        "INBOX": await count({"labels": {"$in": ["INBOX"]}}),
        "IMPORTANT": await count({"labels": {"$in": ["IMPORTANT"]}}),
        "UNREAD": await count({"is_read": False}),
        "SENT": await count({"labels": {"$in": ["SENT"]}}),
        "SPAM": await count({"labels": {"$in": ["SPAM"]}}),
        "TRASH": await count({"labels": {"$in": ["TRASH"]}}),
    }