
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

// Interface for feedback data
export interface PredictionFeedback {
  prediction_id?: string;
  predicted_price: number;
  actual_price?: number;
  is_accurate: boolean;
  vehicle_data: VehicleData;
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

/**
 * Send feedback to improve the model
 */
export const sendPredictionFeedback = async (feedback: PredictionFeedback): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending prediction feedback:", error);
    throw error;
  }
};

/**
 * Get model performance history
 */
export const getModelPerformanceHistory = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/model-performance`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting model performance history:", error);
    throw error;
  }
};
