from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Enable CORS for all domains
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load trained model
model = joblib.load("fish_species_model.pkl")

@app.route("/")
def home():
    return "Fish Market Prediction API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        df = pd.DataFrame([data])

        # Ensure correct feature order
        feature_order = ["Length1", "Length2", "Length3", "Height", "Width", "Weight"]
        df = df[feature_order]

        # Make prediction
        prediction = model.predict(df)

        # Convert predicted label to species name (assuming LabelEncoder was used)
        species_names = ["Bream", "Roach", "Pike", "Perch", "Smelt", "Whitefish"]  # Adjust based on dataset
        predicted_species = species_names[int(prediction[0])]

        return jsonify({"predicted_species": predicted_species})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Ensure it runs on port 5000
