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
                    format="full",
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

            "internal_date": int(message.get("internalDate", 0)),

            "labels": message.get(
                "labelIds",
                [],
            ),

            # --------------------------
            # Flags
            # --------------------------

            "is_read": "UNREAD" not in message.get("labelIds", []),

            "is_starred": "STARRED" in message.get("labelIds", []),

            "is_important": "IMPORTANT" in message.get("labelIds", []),

            "is_spam": "SPAM" in message.get("labelIds", []),

            "is_trash": "TRASH" in message.get("labelIds", []),

            "is_sent": "SENT" in message.get("labelIds", []),

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

            "internal_date": email_data["internal_date"],

            "labels": email_data["labels"],

            "is_read": email_data["is_read"],

            "is_starred": email_data["is_starred"],

            "is_important": email_data["is_important"],

            "is_spam": email_data["is_spam"],

            "is_trash": email_data["is_trash"],

            "is_sent": email_data["is_sent"],           }

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
    # Fetch + Store // current limit is 10,, increase more if needed
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
    

# --------------------------------------------------
    # Modify Labels (read/star/archive/trash)
    # --------------------------------------------------

    def modify_labels(self, message_id, add=None, remove=None):
        try:
            body = {}
            if add:
                body["addLabelIds"] = add
            if remove:
                body["removeLabelIds"] = remove

            result = (
                self.service.users()
                .messages()
                .modify(userId="me", id=message_id, body=body)
                .execute()
            )

            return result

        except HttpError as e:
            print(f"❌ Failed to modify labels for {message_id}")
            print(e)
            return None

    def mark_as_read(self, message_id):
        return self.modify_labels(message_id, remove=["UNREAD"])

    def mark_as_unread(self, message_id):
        return self.modify_labels(message_id, add=["UNREAD"])

    def star_message(self, message_id):
        return self.modify_labels(message_id, add=["STARRED"])

    def unstar_message(self, message_id):
        return self.modify_labels(message_id, remove=["STARRED"])

    def archive_message(self, message_id):
        return self.modify_labels(message_id, remove=["INBOX"])

    def trash_message(self, message_id):
        try:
            return (
                self.service.users()
                .messages()
                .trash(userId="me", id=message_id)
                .execute()
            )
        except HttpError as e:
            print(f"❌ Failed to trash {message_id}")
            print(e)
            return None

    # --------------------------------------------------
    # Send Email (compose / reply / forward)
    # --------------------------------------------------

    def send_message(self, to, subject, body, thread_id=None, in_reply_to=None):
        import base64
        from email.mime.text import MIMEText

        message = MIMEText(body)
        message["to"] = to
        message["subject"] = subject

        if in_reply_to:
            message["In-Reply-To"] = in_reply_to
            message["References"] = in_reply_to

        raw = base64.urlsafe_b64encode(message.as_bytes()).decode()

        payload = {"raw": raw}
        if thread_id:
            payload["threadId"] = thread_id

        try:
            return (
                self.service.users()
                .messages()
                .send(userId="me", body=payload)
                .execute()
            )
        except HttpError as e:
            print("❌ Failed to send message")
            print(e)
            return None

    # --------------------------------------------------
    # Fetch Full Body (for summary/smart reply — snippet isn't enough)
    # --------------------------------------------------

    def get_full_body(self, message):
        import base64

        def extract(parts):
            for part in parts:
                if part.get("mimeType") == "text/plain" and "data" in part.get("body", {}):
                    return base64.urlsafe_b64decode(part["body"]["data"]).decode(errors="ignore")
                if "parts" in part:
                    result = extract(part["parts"])
                    if result:
                        return result
            return ""

        payload = message.get("payload", {})

        if "data" in payload.get("body", {}):
            return base64.urlsafe_b64decode(payload["body"]["data"]).decode(errors="ignore")

        return extract(payload.get("parts", [])) or message.get("snippet", "")