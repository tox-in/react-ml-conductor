
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionResponse } from "@/services/api";
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartLine } from "lucide-react";

interface PredictionResultProps {
  result: PredictionResponse;
}

export default function PredictionResult({ result }: PredictionResultProps) {
  const { predicted_price, model_performance } = result;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(predicted_price);

  // Mock data for visualization (would be replaced with real data from backend)
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
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Model Performance Metrics</CardTitle>
          <CardDescription>How our prediction model is performing</CardDescription>
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
        </CardContent>
      </Card>
    </div>
  );
}
