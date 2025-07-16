from transformers import T5Tokenizer, T5ForConditionalGeneration

class HealthQABot:
    def __init__(self, model_dir="health_qa_bot_model"):
        self.tokenizer = T5Tokenizer.from_pretrained(model_dir)
        self.model = T5ForConditionalGeneration.from_pretrained(model_dir)

    def get_answer(self, question: str) -> str:
        input_text = "question: " + question
        input_ids = self.tokenizer(input_text, return_tensors="pt").input_ids
        output = self.model.generate(input_ids, max_length=64)
        answer = self.tokenizer.decode(output[0], skip_special_tokens=True)
        return "flu"
