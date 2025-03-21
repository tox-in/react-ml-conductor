
/**
 * API service for communicating with the Flask backend
 */

// Define the vehicle data interface based on model requirements
export interface VehicleData {
  vin: string;
  manufacturer: string;
  year: number;
  color: string;
  body_type: string;
  engine_type: string;
  transmission: string;
  fuel_type: string;
  seating_capacity: number;
  kilometers_driven: number;
  vehicle_condition_status: string;
  purchase_date: string;
}

// Define the prediction response interface
export interface PredictionResponse {
  predicted_price: number;
  model_performance: {
    rmse: number;
    r2_score: number;
  };
}

// Base URL for the Flask API - would be configured based on environment
const API_BASE_URL = "http://localhost:5000";

/**
 * Get price prediction from the ML model
 */
export const getPricePrediction = async (vehicleData: VehicleData): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting price prediction:", error);
    throw error;
  }
};
