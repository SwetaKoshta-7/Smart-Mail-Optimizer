# 📧 Smart Mail Optimizer

> An AI-powered web platform that helps users manage their inbox intelligently by organizing, prioritizing, analyzing, and securing emails.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![Google Gmail API](https://img.shields.io/badge/Gmail-API-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Overview

Managing hundreds of emails daily can be overwhelming. **Smart Mail Optimizer** is a modern web application that connects with Gmail using OAuth 2.0 and intelligently organizes emails to improve productivity.

The platform combines rule-based automation and AI/ML techniques to:

- Organize inbox automatically
- Detect important emails
- Generate summaries
- Suggest smart replies
- Detect spam/phishing emails
- Track reminders and follow-ups
- Provide analytics and insights

---

## 🚀 Features

### ✅ Current Features (MVP)

- Google OAuth Authentication
- Gmail API Integration
- Fetch Latest Emails
- Store Emails in MongoDB
- React + FastAPI Architecture
- Clean Modular Backend Structure

---

### 🚧 Upcoming Features

### 📥 Smart Inbox

- Email Categorization
- Priority Detection
- Important Email Highlighting
- Custom Labels
- Search & Filters

### 🤖 AI Features

- Email Summarization
- Smart Reply Suggestions
- Spam Detection
- Phishing Detection
- Deadline Detection
- Follow-up Reminder System
- Personalized Email Recommendations

### 📊 Dashboard

- Inbox Analytics
- Email Statistics
- Top Senders
- Email Trends
- Productivity Insights

---

# 🏗️ System Architecture

```
                    Gmail
                      │
              Google OAuth 2.0
                      │
               Gmail REST API
                      │
──────────────────────────────────────────
          FastAPI Backend
──────────────────────────────────────────
│
├── Authentication
├── Gmail Integration
├── Email Processing
├── MongoDB Storage
├── REST APIs
│
──────────────────────────────────────────
                      │
                  MongoDB
                      │
──────────────────────────────────────────
                React Frontend
──────────────────────────────────────────
│
├── Login
├── Dashboard
├── Inbox
├── Analytics
├── Settings
│
──────────────────────────────────────────
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- FastAPI
- Python
- Google Gmail API
- Google OAuth 2.0
- Motor
- PyMongo

## Database

- MongoDB

## AI & ML (Upcoming)

- Scikit-learn
- Hugging Face Transformers
- spaCy
- NLTK
- Sentence Transformers

---

# 📂 Project Structure

```
Smart-Mail-Optimizer/

├── backend/
│
│   ├── app/
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── email.py
│   │   └── dashboard.py
│   │
│   ├── services/
│   │   ├── gmail_service.py
│   │   ├── email_service.py
│   │   └── user_service.py
│   │
│   ├── database/
│   │   └── mongodb.py
│   │
│   ├── config.py
│   └── main.py
│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── App.jsx
│
├── README.md
└── requirements.txt
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Smart-Mail-Optimizer.git

cd Smart-Mail-Optimizer
```

---

## Backend Setup

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_REDIRECT_URI=http://localhost:8000/auth/callback

FRONTEND_URL=http://localhost:5173

MONGO_URI=

DATABASE_NAME=smart_mail_optimizer
```

---

# 📊 Current Workflow

```
React

↓

Google Login

↓

OAuth Authentication

↓

Access Token

↓

Gmail API

↓

Fetch Emails

↓

Store MongoDB

↓

React Dashboard
```

---

# 📌 Development Roadmap

## ✅ Phase 1

- [x] Project Setup
- [x] FastAPI Backend
- [x] React Frontend
- [x] MongoDB Connection
- [x] Google OAuth
- [x] Gmail Integration

---

## 🚧 Phase 2

- [ ] Inbox Dashboard
- [ ] Email API
- [ ] Search
- [ ] Filters
- [ ] Pagination

---

## 🚧 Phase 3

- [ ] Rule-Based Categorization
- [ ] Priority Detection
- [ ] Attachment Organizer
- [ ] Dashboard Analytics

---

## 🚧 Phase 4

- [ ] Email Summarization
- [ ] Smart Reply
- [ ] Spam Detection
- [ ] Phishing Detection
- [ ] Reminder System

---

## 🚧 Phase 5

- [ ] ML Personalization
- [ ] Email Recommendation Engine
- [ ] Productivity Insights
- [ ] Advanced Analytics

---

# 🎯 Project Goals

- Reduce inbox clutter
- Improve email productivity
- Prioritize important emails
- Enhance email security
- Save users' time using AI-powered automation

---

# 📈 Future Scope

- Outlook Integration
- Multi-account Support
- Mobile Application
- Calendar Integration
- Voice Commands
- Team Workspace
- AI Email Assistant
- Semantic Email Search
- Auto Label Generation

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Sweta Koshta**
**Shivansh Gupta**

B.Tech Computer Science (AI & ML)

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
