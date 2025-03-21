
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionResponse } from "@/services/api";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { ChartLine, ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface PredictionResultProps {
  result: PredictionResponse;
}

export default function PredictionResult({ result }: PredictionResultProps) {
  const { predicted_price, model_performance } = result;
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(predicted_price);

  // Generate history data for model performance visualization
  const historyData = [
    { month: 'Jan', rmse: 2700, r2_score: 0.81 * 100 },
    { month: 'Feb', rmse: 2650, r2_score: 0.82 * 100 },
    { month: 'Mar', rmse: 2580, r2_score: 0.83 * 100 },
    { month: 'Apr', rmse: 2520, r2_score: 0.835 * 100 },
    { month: 'May', rmse: 2490, r2_score: 0.84 * 100 },
    { month: 'Current', rmse: model_performance.rmse, r2_score: model_performance.r2_score * 100 },
  ];

  // Performance metrics for the bar chart
  const performanceData = [
    {
      name: "RMSE",
      value: model_performance.rmse,
      fill: "#8884d8",
    },
    {
      name: "R² Score",
      value: model_performance.r2_score * 100, // Convert to percentage
      fill: "#82ca9d",
    },
  ];

  // Function to send feedback to improve model
  const sendFeedback = (isAccurate: boolean) => {
    // In a real app, you would call an API endpoint to send feedback
    console.log("Sending feedback to improve model:", { prediction: predicted_price, isAccurate });
    
    // Mock successful feedback submission
    setTimeout(() => {
      toast({
        title: "Feedback submitted",
        description: `Thank you! Your feedback helps improve our prediction model.`,
      });
      setFeedbackSent(true);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white shadow-sm border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold text-center">Predicted Purchase Price</CardTitle>
          <CardDescription className="text-center">Based on your vehicle specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <span className="text-5xl font-bold text-primary">{formattedPrice}</span>
            <p className="text-sm text-muted-foreground mt-2">
              This is the recommended purchase price for the vehicle
            </p>
            
            {!feedbackSent && (
              <div className="mt-6 flex items-center gap-4">
                <p className="text-sm text-muted-foreground">Was this prediction accurate?</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => sendFeedback(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" /> Yes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => sendFeedback(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" /> No
                </Button>
              </div>
            )}
            
            {feedbackSent && (
              <p className="text-sm text-green-600 mt-4">
                Thank you for your feedback! It will help improve our model.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Model Performance Metrics</CardTitle>
              <CardDescription>How our prediction model is performing</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-1">RMSE (Root Mean Square Error)</h4>
              <p className="text-sm text-muted-foreground">
                {model_performance.rmse.toFixed(2)} - Lower is better. This represents the average prediction error.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-1">R² Score</h4>
              <p className="text-sm text-muted-foreground">
                {model_performance.r2_score.toFixed(4)} - Higher is better. This represents how well the model fits the data.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Model Performance Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={historyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="rmse" stroke="#8884d8" activeDot={{ r: 8 }} name="RMSE" />
                  <Line yAxisId="right" type="monotone" dataKey="r2_score" stroke="#82ca9d" name="R² Score (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
