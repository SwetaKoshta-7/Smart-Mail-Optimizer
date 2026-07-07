import json
import google.generativeai as genai

from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-2.0-flash"


class AIService:

    @staticmethod
    def summarize_email(sender: str, subject: str, body: str) -> str:
        model = genai.GenerativeModel(MODEL_NAME)

        prompt = (
            "Summarize this email in 2-3 short sentences.\n\n"
            f"From: {sender}\nSubject: {subject}\nBody: {body[:3000]}"
        )

        response = model.generate_content(prompt)

        return response.text.strip()

    @staticmethod
    def generate_smart_replies(sender: str, subject: str, body: str) -> list[str]:
        model = genai.GenerativeModel(MODEL_NAME)

        prompt = (
            "Generate exactly 3 short, distinct reply options (1-2 sentences each) "
            "for this email. Return ONLY a JSON array of 3 strings, nothing else, "
            "no markdown code fences.\n\n"
            f"From: {sender}\nSubject: {subject}\nBody: {body[:3000]}"
        )

        response = model.generate_content(prompt)

        text = response.text.strip()
        text = text.replace("```json", "").replace("```", "").strip()

        try:
            return json.loads(text)
        except Exception:
            return [text]