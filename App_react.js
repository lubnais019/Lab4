import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState({
    Length1: "",
    Length2: "",
    Length3: "",
    Height: "",
    Width: "",
    Weight: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", inputData, {
        headers: { "Content-Type": "application/json" },
      });
      setPrediction(response.data.predicted_species);
    } catch (error) {
      setPrediction("Error fetching prediction. Make sure Flask is running!");
    }
  };

  return (
    <div className="container">
      <h1>🐟 Fish Species Predictor</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(inputData).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key}
            value={inputData[key]}
            onChange={handleChange}
            className="input-field"
            required
          />
        ))}
        <button type="submit">Predict</button>
      </form>

      {prediction && <div className="result">Predicted Species: {prediction}</div>}
    </div>
  );
}

export default App;
