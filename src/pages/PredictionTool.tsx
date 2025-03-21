
import { useState } from "react";
import { ChartLine, Car, AlertCircle } from "lucide-react";
import VehicleForm from "@/components/prediction/VehicleForm";
import PredictionResult from "@/components/prediction/PredictionResult";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VehicleData, PredictionResponse, getPricePrediction } from "@/services/api";
import { toast } from "@/hooks/use-toast";

export default function PredictionTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: VehicleData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the actual API
      // For demo purposes, we'll create a mock response after a delay
      const result = await mockPrediction(data);
      
      setPredictionResult(result);
      toast({
        title: "Prediction complete",
        description: "Your vehicle price prediction is ready to view",
      });
    } catch (err) {
      setError("There was a problem getting the prediction. Please try again.");
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // This is a mock function that simulates an API call
  // In production, you would replace this with the actual API call
  const mockPrediction = async (data: VehicleData): Promise<PredictionResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo: calculate a price based on the input data
    const basePrice = 20000;
    const yearModifier = (data.year - 2010) * 500;
    const kmModifier = -(data.kilometers_driven / 10000) * 800;
    const conditionModifier = 
      data.vehicle_condition_status === "Excellent" ? 5000 :
      data.vehicle_condition_status === "Good" ? 2500 :
      data.vehicle_condition_status === "Fair" ? 0 : -2500;
    
    const price = Math.max(5000, basePrice + yearModifier + kmModifier + conditionModifier);
    
    // Create a mock response
    return {
      predicted_price: price,
      model_performance: {
        rmse: 2456.78,
        r2_score: 0.85
      }
    };
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Vehicle Price Prediction Tool</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our machine learning model analyzes vehicle specifications to predict the optimal purchase price.
          Enter your vehicle details below to get a price estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Vehicle Details</h2>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <VehicleForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ChartLine className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Prediction Results</h2>
          </div>
          
          {!predictionResult && !isLoading && (
            <div className="bg-muted rounded-lg p-8 h-[300px] flex items-center justify-center text-center">
              <div>
                <p className="text-muted-foreground mb-2">
                  Fill out the vehicle details form and submit to see your price prediction
                </p>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="bg-muted rounded-lg p-8 h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                <p className="text-muted-foreground">Analyzing vehicle data and generating prediction...</p>
              </div>
            </div>
          )}
          
          {predictionResult && !isLoading && (
            <PredictionResult result={predictionResult} />
          )}
        </div>
      </div>
    </div>
  );
}
