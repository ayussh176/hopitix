from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
import pandas as pd
import torch

df = pd.read_csv('health_qa_dataset.csv').dropna()

tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

class QADataset(torch.utils.data.Dataset):
    def __init__(self, questions, answers):
        self.inputs = tokenizer(
            ["question: " + q for q in questions],
            max_length=64, padding='max_length', truncation=True, return_tensors="pt"
        )
        self.labels = tokenizer(
            ["answer: " + a for a in answers],
            max_length=64, padding='max_length', truncation=True, return_tensors="pt"
        )
    def __getitem__(self, idx):
        return {
            'input_ids': self.inputs['input_ids'][idx],
            'attention_mask': self.inputs['attention_mask'][idx],
            'labels': self.labels['input_ids'][idx],
        }
    def __len__(self):
        return len(self.inputs['input_ids'])

dataset = QADataset(df['question'], df['answer'])

training_args = TrainingArguments(
    output_dir="./qa_model",
    per_device_train_batch_size=4,
    num_train_epochs=4,
    save_strategy="epoch",
    logging_dir='./logs'
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset
)

trainer.train()
model.save_pretrained("./health_qa_bot_model")
tokenizer.save_pretrained("./health_qa_bot_model")
