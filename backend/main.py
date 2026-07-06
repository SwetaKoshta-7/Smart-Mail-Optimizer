import os

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.config import FRONTEND_URL
from app.auth.auth import router as auth_router
from app.database.mongodb import init_db, close_db

from app.api.email import router as api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize MongoDB indexes
    await init_db()
    print("✅ MongoDB Connected")

    yield

    # Close MongoDB connection
    await close_db()
    print("🔴 MongoDB Connection Closed")


app = FastAPI(
    title="Smart Mail Optimizer",
    lifespan=lifespan
)

# Session Middleware
app.add_middleware(
    SessionMiddleware,
    secret_key="your_super_secret_key"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)


@app.get("/")
async def home():
    return {
        "status": "success",
        "message": "Smart Mail Optimizer Backend Running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "database": "connected"
    }

app.include_router(
    api_router,
    prefix="/api",
    tags=["Emails"]
)