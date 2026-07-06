# # backend/app/services/gmail_service.py

# from datetime import datetime

# from googleapiclient.discovery import build
# from googleapiclient.errors import HttpError

# from app.database.mongodb import emails


# class GmailService:
#     def __init__(self, credentials):
#         """
#         Initialize Gmail API service.
#         """
#         self.service = build(
#             "gmail",
#             "v1",
#             credentials=credentials
#         )

#     # ==========================================================
#     # Fetch Latest Email IDs
#     # ==========================================================
#     def fetch_message_ids(self, max_results: int = 20):
#         """
#         Fetch the latest Gmail message IDs.
#         """

#         try:
#             response = (
#                 self.service.users()
#                 .messages()
#                 .list(
#                     userId="me",
#                     maxResults=max_results
#                 )
#                 .execute()
#             )

#             return response.get("messages", [])

#         except HttpError as e:
#             print(f"Gmail API Error: {e}")
#             return []

#     # ==========================================================
#     # Fetch Email Metadata
#     # ==========================================================
#     def fetch_message(self, message_id: str):
#         """
#         Fetch email metadata only.
#         """

#         try:
#             message = (
#                 self.service.users()
#                 .messages()
#                 .get(
#                     userId="me",
#                     id=message_id,
#                     format="metadata",
#                     metadataHeaders=[
#                         "From",
#                         "Subject",
#                         "Date",
#                     ],
#                 )
#                 .execute()
#             )

#             return message

#         except HttpError as e:
#             print(f"Gmail API Error: {e}")
#             return None

#     # ==========================================================
#     # Parse Email Metadata
#     # ==========================================================

#     def parse_message(self, message):
#         """
#         Convert Gmail API response into the application's email model.
#         """

#         headers = message.get("payload", {}).get("headers", [])

#         sender = ""
#         subject = ""
#         date = ""

#         for header in headers:

#             name = header.get("name", "")
#             value = header.get("value", "")

#             if name == "From":
#                 sender = value

#             elif name == "Subject":
#                 subject = value

#             elif name == "Date":
#                 date = value

#         return {
#             "gmail_id": message.get("id"),
#             "sender": sender,
#             "subject": subject,
#             "snippet": message.get("snippet", ""),
#             "date": date,
#             "labels": message.get("labelIds", [])
#         }

#     # ==========================================================
#     # Save Email to MongoDB
#     # ==========================================================

#     async def save_to_database(self, email_data: dict):
#         """
#         Save email to MongoDB.
#         Skip if the email already exists.
#         """

#         existing = await emails.find_one(
#             {"gmail_id": email_data["gmail_id"]}
#         )

#         if existing:
#             return existing

#         document = {
#             "gmail_id": email_data["gmail_id"],
#             "sender": email_data["sender"],
#             "subject": email_data["subject"],
#             "snippet": email_data["snippet"],
#             "date": email_data["date"],
#             "labels": email_data["labels"],
#         }

#         result = await emails.insert_one(document)

#         document["_id"] = str(result.inserted_id)

#         return document

#     # ==========================================================
#     # Fetch + Parse + Save
#     # ==========================================================
#     async def fetch_and_store_emails(self, max_results: int = 20):
#         """
#         Fetch latest email metadata
#         and save to MongoDB.
#         """

#         message_ids = self.fetch_message_ids(max_results)

#         stored_emails = []

#         for msg in message_ids:

#             metadata = self.fetch_message(msg["id"])

#             if metadata is None:
#                 continue

#             parsed_email = self.parse_message(metadata)

#             await self.save_to_database(parsed_email)

#             stored_emails.append(parsed_email)

#         return stored_emails


from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from app.database.mongodb import emails


class GmailService:

    def __init__(self, credentials):
        self.service = build(
            "gmail",
            "v1",
            credentials=credentials,
        )

    # --------------------------------------------------
    # Fetch Message IDs
    # --------------------------------------------------

    def fetch_message_ids(self, max_results=20):

        try:

            response = (
                self.service.users()
                .messages()
                .list(
                    userId="me",
                    maxResults=max_results,
                )
                .execute()
            )

            messages = response.get("messages", [])

            print(f"\n📬 Gmail returned {len(messages)} messages")

            return messages

        except HttpError as e:

            print("❌ Gmail API Error")
            print(e)

            return []

    # --------------------------------------------------
    # Fetch Single Message
    # --------------------------------------------------

    def fetch_message(self, message_id):

        try:

            message = (
                self.service.users()
                .messages()
                .get(
                    userId="me",
                    id=message_id,
                    format="metadata",
                    metadataHeaders=[
                        "From",
                        "Subject",
                        "Date",
                    ],
                )
                .execute()
            )

            return message

        except HttpError as e:

            print(f"❌ Failed to fetch {message_id}")
            print(e)

            return None

    # --------------------------------------------------
    # Parse Gmail Response
    # --------------------------------------------------

    def parse_message(self, message):

        headers = message.get(
            "payload",
            {}
        ).get(
            "headers",
            []
        )

        sender = ""
        subject = ""
        date = ""

        for header in headers:

            if header["name"] == "From":
                sender = header["value"]

            elif header["name"] == "Subject":
                subject = header["value"]

            elif header["name"] == "Date":
                date = header["value"]

        return {

            "gmail_id": message.get("id"),

            "thread_id": message.get("threadId"),

            "sender": sender,

            "subject": subject,

            "snippet": message.get(
                "snippet",
                "",
            ),

            "date": date,

            "labels": message.get(
                "labelIds",
                [],
            ),
        }

    # --------------------------------------------------
    # Save Email
    # --------------------------------------------------

    async def save_to_database(
        self,
        google_id,
        email_data,
    ):

        document = {

            "google_id": google_id,

            "gmail_id": email_data["gmail_id"],

            "thread_id": email_data["thread_id"],

            "sender": email_data["sender"],

            "subject": email_data["subject"],

            "snippet": email_data["snippet"],

            "date": email_data["date"],

            "labels": email_data["labels"],
        }

        result = await emails.update_one(

            {
                "gmail_id": email_data["gmail_id"],
                "google_id": google_id,
            },

            {
                "$set": document,
            },

            upsert=True,
        )

        if result.upserted_id:

            print(f"✅ Inserted : {email_data['subject']}")

        else:

            print(f"♻ Updated : {email_data['subject']}")

    # --------------------------------------------------
    # Fetch + Store
    # --------------------------------------------------

    async def fetch_and_store_emails(
        self,
        google_id,
        max_results=20,
    ):

        message_ids = self.fetch_message_ids(
            max_results
        )

        if len(message_ids) == 0:

            print("⚠ No emails found.")

            return []

        stored = []

        print("\nStarting Gmail Sync...\n")

        for msg in message_ids:

            metadata = self.fetch_message(
                msg["id"]
            )

            if metadata is None:
                continue

            email = self.parse_message(
                metadata
            )

            print(
                f"📧 {email['sender']} -> {email['subject']}"
            )

            await self.save_to_database(
                google_id,
                email,
            )

            stored.append(email)

        print("\n===================================")
        print(f"Sync Complete : {len(stored)} Emails")
        print("===================================\n")

        return stored