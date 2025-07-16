from fastapi import APIRouter
from pydantic import BaseModel
from ai_models.health_qa_bot.model import HealthQABot
from ai_models.symptom_checker.model import SymptomChecker

router = APIRouter()

# Load models
qa_bot = HealthQABot()
symptom_checker = SymptomChecker()

class QABotQuery(BaseModel):
    question: str

class SymptomQuery(BaseModel):
    symptoms: str

@router.post("/ask-healthbot")
def ask_health_bot(data: QABotQuery):
    answer = qa_bot.get_answer(data.question)
    return {"answer": answer}

@router.post("/analyze-symptoms")
def analyze_symptoms(data: SymptomQuery):
    condition = symptom_checker.predict_condition(data.symptoms)
    return {"possible_condition": condition}
