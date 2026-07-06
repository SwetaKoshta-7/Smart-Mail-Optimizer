from mongoengine import Document
from mongoengine import StringField


class Email(Document):

    gmail_id = StringField(unique=True)

    sender = StringField()

    subject = StringField()

    snippet = StringField()

    date = StringField()

    meta = {
        "collection": "emails"
    }