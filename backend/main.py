from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import chatbot_routes, upload_routes, auth_routes

app = FastAPI(title="AI-Powered Health Backend")

# CORS setup for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routers
app.include_router(chatbot_routes.router)
app.include_router(upload_routes.router)
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"status": "API is running"}
