from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING

from app.config import MONGO_URI, DATABASE_NAME


# MongoDB Client
client = AsyncIOMotorClient(MONGO_URI)

db = client[DATABASE_NAME]


# Collections
users = db["users"]
emails = db["emails"]

# Database Initialization
async def init_db():
    """
    Initialize MongoDB indexes.
    Call this once when FastAPI starts.
    """

    # Users
    await users.create_index(
        [
            ("google_id", ASCENDING),
         ],
        unique=True
    )

    await users.create_index(
        [("email", ASCENDING)],
        unique=True
    )

    # Emails
    await emails.create_index(
        [
            ("gmail_id", ASCENDING),
            ("google_id", ASCENDING),
        ],
        unique=True
    )

    await emails.create_index(
        [("thread_id", ASCENDING)]
    )

    await emails.create_index(
        [("sender", ASCENDING)]
    )

    await emails.create_index(
        [("subject", ASCENDING)]
    )

    await emails.create_index(
        [("date", ASCENDING)]
    )

    print("✅ MongoDB indexes created successfully.")


# Close Connection
async def close_db():
    client.close()