import re

from fastapi import APIRouter, Request, Query, HTTPException
from google.oauth2.credentials import Credentials

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