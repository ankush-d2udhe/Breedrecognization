# Pre-trained Model Integration Guide

## Quick Setup for Your Pre-trained Indian Breed Model

### 1. Update Environment Variables
Replace the placeholder URL in `.env` with your actual model API endpoint:

```env
VITE_INDIAN_BREED_MODEL_URL=https://your-actual-model-api.com/predict
VITE_ML_API_KEY=your_api_key_here
```

### 2. Expected API Response Format
Your model API should return JSON in this format:

```json
{
  "predicted_breed": "gir",
  "confidence": 87.5,
  "is_indian_breed": true,
  "features_detected": {
    "hump_size": "large",
    "ear_shape": "drooping",
    "color_pattern": "reddish_brown_white"
  },
  "model_info": {
    "model_version": "1.0",
    "accuracy": "95%+",
    "training_data": "Indian breeds dataset"
  }
}
```

### 3. Supported Model Formats

#### TensorFlow/Keras
```python
# Example Flask API wrapper
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
model = tf.keras.models.load_model('indian_breed_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['image']
    # Preprocess image
    img = Image.open(image).resize((224, 224))
    img_array = np.array(img) / 255.0
    prediction = model.predict(np.expand_dims(img_array, axis=0))
    
    breed_classes = ['gir', 'sahiwal', 'red_sindhi', 'murrah', 'nili_ravi', 'tharparkar']
    predicted_class = breed_classes[np.argmax(prediction)]
    confidence = float(np.max(prediction) * 100)
    
    return jsonify({
        'predicted_breed': predicted_class,
        'confidence': confidence,
        'is_indian_breed': True
    })
```

#### PyTorch
```python
import torch
import torchvision.transforms as transforms
from PIL import Image

model = torch.load('indian_breed_model.pth')
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    image = request.files['image']
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    img = Image.open(image)
    img_tensor = transform(img).unsqueeze(0)
    
    with torch.no_grad():
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        confidence, predicted = torch.max(probabilities, 0)
    
    breed_classes = ['gir', 'sahiwal', 'red_sindhi', 'murrah', 'nili_ravi', 'tharparkar']
    
    return jsonify({
        'predicted_breed': breed_classes[predicted.item()],
        'confidence': confidence.item() * 100,
        'is_indian_breed': True
    })
```

#### ONNX Runtime
```python
import onnxruntime as ort
import numpy as np

session = ort.InferenceSession('indian_breed_model.onnx')

@app.route('/predict', methods=['POST'])
def predict():
    # Preprocess image to match model input
    img_array = preprocess_image(request.files['image'])
    
    # Run inference
    outputs = session.run(None, {'input': img_array})
    predictions = outputs[0][0]
    
    breed_classes = ['gir', 'sahiwal', 'red_sindhi', 'murrah', 'nili_ravi', 'tharparkar']
    predicted_idx = np.argmax(predictions)
    confidence = float(predictions[predicted_idx] * 100)
    
    return jsonify({
        'predicted_breed': breed_classes[predicted_idx],
        'confidence': confidence,
        'is_indian_breed': True
    })
```

### 4. Model Deployment Options

#### Option A: Local API Server
- Run your model as a Flask/FastAPI server locally
- Update `VITE_INDIAN_BREED_MODEL_URL=http://localhost:5000/predict`

#### Option B: Cloud Deployment
- Deploy to AWS SageMaker, Google Cloud AI Platform, or Azure ML
- Update URL to your cloud endpoint

#### Option C: Edge Deployment
- Use TensorFlow.js for browser-based inference
- Convert model to TensorFlow.js format

### 5. Testing Your Integration

1. Start your model API server
2. Update the URL in `.env`
3. Upload a test image in the breed recognition page
4. Check browser console for API calls and responses

### 6. Performance Optimization

- **Image Preprocessing**: Resize images to model's expected input size
- **Batch Processing**: Process multiple images together if supported
- **Caching**: Cache predictions for identical images
- **Compression**: Use image compression to reduce API payload

### 7. Error Handling

The frontend handles these error scenarios:
- Model API unavailable (connection error)
- Low confidence predictions (< 70%)
- Non-Indian breed detection
- Invalid image format
- API timeout

### 8. Data Collection for Model Improvement

Users can contribute labeled images through the feedback system:
- Correct predictions are stored for validation
- Incorrect predictions with corrections improve training data
- Location metadata helps with regional breed variations

## Ready to Deploy!

Once you update the API URL in `.env`, your pre-trained model will be integrated and ready to achieve 95%+ accuracy on Indian cattle and buffalo breeds.