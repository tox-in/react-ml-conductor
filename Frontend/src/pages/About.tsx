
import { ChartBar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">About Our Vehicle Price Prediction Tool</h1>
      
      <div className="prose max-w-none">
        <p className="text-xl mb-6">
          Our machine learning model uses advanced linear regression techniques to predict the optimal purchase price for vehicles based on their specifications.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">The Model</h2>
        <p>
          The prediction model is trained on a comprehensive dataset containing various vehicle attributes such as:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Vehicle Identification Number (VIN)</li>
          <li>Manufacturer</li>
          <li>Year</li>
          <li>Color</li>
          <li>Body Type</li>
          <li>Engine Type</li>
          <li>Transmission</li>
          <li>Fuel Type</li>
          <li>Seating Capacity</li>
          <li>Kilometers Driven</li>
          <li>Vehicle Condition Status</li>
          <li>Purchase Date</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Model Performance</h2>
        <p>
          We evaluate our model using industry-standard metrics:
        </p>
        <div className="flex items-center bg-muted p-4 rounded-md my-4">
          <ChartBar className="h-12 w-12 mr-4 text-primary" />
          <div>
            <h3 className="font-semibold">RMSE (Root Mean Square Error)</h3>
            <p className="text-sm">Measures the average magnitude of prediction errors. Lower values indicate better accuracy.</p>
          </div>
        </div>
        <div className="flex items-center bg-muted p-4 rounded-md my-4">
          <ChartBar className="h-12 w-12 mr-4 text-primary" />
          <div>
            <h3 className="font-semibold">R² Score (Coefficient of Determination)</h3>
            <p className="text-sm">Indicates how well the model fits the data. Values closer to 1 represent better fit.</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Data Processing</h2>
        <p>
          Our data pipeline includes the following steps:
        </p>
        <ol className="list-decimal pl-6 mb-6">
          <li>Data collection from reliable sources</li>
          <li>Data cleaning and preprocessing</li>
          <li>Feature engineering and selection</li>
          <li>Model training and validation</li>
          <li>Hyperparameter tuning</li>
          <li>Performance evaluation</li>
        </ol>
        
        <p className="mt-8">
          The model is continuously improved as more data becomes available, ensuring the most accurate predictions possible.
        </p>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link to="/predict">Try the Prediction Tool</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
