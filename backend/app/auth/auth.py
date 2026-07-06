from datetime import datetime

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse

from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from app.config import GOOGLE_REDIRECT_URI, FRONTEND_URL
from app.database.mongodb import users
from app.services.gmail_service import GmailService

router = APIRouter()

SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/gmail.readonly",
]


# ==========================================================
# OAuth Flow
# ==========================================================

def create_flow(state=None):
    flow = Flow.from_client_secrets_file(
        "client_secret.json",
        scopes=SCOPES,
        state=state,
        redirect_uri=GOOGLE_REDIRECT_URI,
    )

    return flow


# ==========================================================
# Login
# ==========================================================

@router.get("/login")
def login(request: Request):

    flow = create_flow()

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )

    request.session["oauth_state"] = state
    request.session["code_verifier"] = flow.code_verifier

    print("\n========== LOGIN ==========")
    print("OAuth State :", state)
    print("===========================\n")

    return RedirectResponse(authorization_url)


# ==========================================================
# Callback
# ==========================================================

@router.get("/callback")
async def callback(request: Request):

    try:

        print("\n========== CALLBACK ==========")
        print("Session :", dict(request.session))
        print("==============================")

        # -----------------------------------
        # Validate OAuth State
        # -----------------------------------

        state = request.session.get("oauth_state")

        if not state:
            raise HTTPException(
                status_code=400,
                detail="OAuth state missing."
            )

        # -----------------------------------
        # Exchange Code
        # -----------------------------------

        flow = create_flow(state)

        flow.code_verifier = request.session.get(
            "code_verifier"
        )

        flow.fetch_token(
            authorization_response=str(request.url)
        )

        credentials = flow.credentials

        # -----------------------------------
        # Save Credentials
        # -----------------------------------

        request.session["credentials"] = {
            "token": credentials.token,
            "refresh_token": credentials.refresh_token,
            "token_uri": credentials.token_uri,
            "client_id": credentials.client_id,
            "client_secret": credentials.client_secret,
            "scopes": credentials.scopes,
        }

        print("✅ Credentials Saved")

        # -----------------------------------
        # Google User Info
        # -----------------------------------

        oauth2 = build(
            "oauth2",
            "v2",
            credentials=credentials,
        )

        userinfo = oauth2.userinfo().get().execute()

        print("\n========== USER ==========")
        print(userinfo)
        print("==========================\n")

        request.session["user_id"] = userinfo["id"]
        request.session["user_email"] = userinfo["email"]
        request.session["user_name"] = userinfo.get("name")

        # -----------------------------------
        # Store User
        # -----------------------------------

        await users.update_one(
            {
                "google_id": userinfo["id"]
            },
            {
                "$set": {
                    "email": userinfo["email"],
                    "name": userinfo.get("name"),
                    "picture": userinfo.get("picture"),
                    "verified_email": userinfo.get(
                        "verified_email",
                        False,
                    ),
                    "last_login": datetime.utcnow(),
                },
                "$setOnInsert": {
                    "google_id": userinfo["id"],
                    "created_at": datetime.utcnow(),
                },
            },
            upsert=True,
        )

        print("✅ User Saved")

        # -----------------------------------
        # Fetch Gmail Emails
        # -----------------------------------

        gmail = GmailService(credentials)

        stored_emails = await gmail.fetch_and_store_emails(
            google_id=userinfo["id"],
            max_results=20
        )

        print("\n========== EMAILS ==========")
        print(f"Fetched : {len(stored_emails)} emails")

        if stored_emails:

            print("Sample Email")

            print(stored_emails[0])

        else:

            print("No emails returned!")

        print("============================\n")

        # -----------------------------------
        # Redirect
        # -----------------------------------

        return RedirectResponse(
            url=f"{FRONTEND_URL}/dashboard"
        )

    except HttpError as e:

        print("\n❌ Gmail API Error")
        print(e)

        raise HTTPException(
            status_code=500,
            detail="Gmail API Error"
        )

    except Exception as e:

        print("\n❌ Callback Error")
        print(type(e).__name__)
        print(e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    

@router.get("/me")
async def get_current_user(request: Request):
    if "user_id" not in request.session:
        raise HTTPException(status_code=401, detail="Not authenticated")

    return {
        "google_id": request.session["user_id"],
        "email": request.session["user_email"],
        "name": request.session.get("user_name"),
    }


@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"success": True}