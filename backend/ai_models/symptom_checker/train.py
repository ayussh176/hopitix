import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

df = pd.read_csv('symptoms_dataset.csv').dropna()

X = df['symptoms']
y = df['possible_condition']

model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression(max_iter=200))
])

model.fit(X, y)
joblib.dump(model, 'symptom_checker_model.pkl')
print("Model trained and saved as symptom_checker_model.pkl")