from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AuthRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(auth: AuthRequest):
    # Dummy login logic for now
    if auth.email == "patient@demo.com" and auth.password == "123456":
        return {"token": "dummy_token", "role": "patient"}
    return {"error": "Invalid credentials"}

@router.post("/signup")
def signup(auth: AuthRequest):
    # Just echo back for now
    return {"message": f"Signed up {auth.email}"}
