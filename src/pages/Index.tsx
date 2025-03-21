
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChartLine, Car, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Vehicle Price <span className="text-primary">Prediction</span> Tool
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              Our machine learning model helps you determine the optimal purchase price for any vehicle based on its specifications and market conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/predict">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <Car className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Input Vehicle Details</CardTitle>
                <CardDescription>
                  Enter specifications like make, model, year, condition, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our form collects all the relevant information about the vehicle to ensure accurate predictions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader>
                <ChartLine className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Machine Learning Analysis</CardTitle>
                <CardDescription>
                  Our linear regression model processes the data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our sophisticated ML model analyzes the input against thousands of historical vehicle sales data points.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardHeader>
                <FileText className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Get Price Prediction</CardTitle>
                <CardDescription>
                  Receive an accurate purchase price estimate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View your predicted price along with important model performance metrics like RMSE and R² score.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/predict">Try It Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
