import re

def clean_text(text: str) -> str:
    """
    Lowercase and remove special characters.
    """
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s,]", "", text)
    return text.strip()

def extract_keywords(text: str) -> list:
    """
    Basic keyword extractor using comma or space splits.
    """
    text = clean_text(text)
    if ',' in text:
        return [word.strip() for word in text.split(',') if word.strip()]
    return [word.strip() for word in text.split() if word.strip()]
