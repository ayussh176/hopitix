import joblib

class SymptomChecker:
    def __init__(self, model_path='symptom_checker_model.pkl'):
        self.model = joblib.load(model_path)

    def predict_condition(self, symptoms: str) -> str:
        return self.model.predict([symptoms])[0]
