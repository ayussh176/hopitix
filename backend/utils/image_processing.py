from PIL import Image
import numpy as np
import io

def preprocess_image(image_bytes: bytes, target_size=(224, 224)) -> np.ndarray:
    """
    Preprocess an uploaded image for CNN model (e.g., symptom image).
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(target_size)
    image_array = np.array(image) / 255.0  # Normalize
    return image_array.astype("float32")

def image_to_tensor(image_array: np.ndarray) -> np.ndarray:
    """
    Reshape image to (1, height, width, channels) for prediction.
    """
    return np.expand_dims(image_array, axis=0)
