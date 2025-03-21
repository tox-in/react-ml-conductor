
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@radix-ui/react-select";
import { 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { VehicleData } from "@/services/api";
import { toast } from "@/hooks/use-toast";

// Predefined options for select fields
const manufacturers = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Nissan", "Hyundai", "Kia"];
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Truck", "Van", "Coupe", "Convertible", "Wagon"];
const engineTypes = ["Inline-4", "V6", "V8", "Electric", "Hybrid", "Diesel"];
const transmissions = ["Automatic", "Manual", "CVT", "DCT", "Semi-Automatic"];
const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const conditionStatuses = ["Excellent", "Good", "Fair", "Poor"];
const colors = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Brown", "Orange"];

interface VehicleFormProps {
  onSubmit: (data: VehicleData) => void;
  isLoading: boolean;
}

export default function VehicleForm({ onSubmit, isLoading }: VehicleFormProps) {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState<VehicleData>({
    vin: "",
    manufacturer: "",
    year: currentYear,
    color: "",
    body_type: "",
    engine_type: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 5,
    kilometers_driven: 0,
    vehicle_condition_status: "",
    purchase_date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "year" || name === "seating_capacity" || name === "kilometers_driven" 
        ? parseInt(value, 10) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      "vin", "manufacturer", "year", "color", "body_type", 
      "engine_type", "transmission", "fuel_type", "vehicle_condition_status"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof VehicleData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in all required fields: ${missingFields.join(", ")}`,
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VIN Number */}
        <div className="space-y-2">
          <Label htmlFor="vin">VIN Number*</Label>
          <Input
            id="vin"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            placeholder="e.g. 1HGCM82633A004352"
          />
        </div>

        {/* Manufacturer */}
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer*</Label>
          <Select name="manufacturer" value={formData.manufacturer} onValueChange={(value) => handleSelectChange("manufacturer", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent>
              {manufacturers.map(manufacturer => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">Year*</Label>
          <Input
            id="year"
            name="year"
            type="number"
            min="1990"
            max={currentYear}
            value={formData.year}
            onChange={handleChange}
          />
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label htmlFor="color">Color*</Label>
          <Select name="color" value={formData.color} onValueChange={(value) => handleSelectChange("color", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map(color => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <Label htmlFor="body_type">Body Type*</Label>
          <Select name="body_type" value={formData.body_type} onValueChange={(value) => handleSelectChange("body_type", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Engine Type */}
        <div className="space-y-2">
          <Label htmlFor="engine_type">Engine Type*</Label>
          <Select name="engine_type" value={formData.engine_type} onValueChange={(value) => handleSelectChange("engine_type", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select engine type" />
            </SelectTrigger>
            <SelectContent>
              {engineTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission*</Label>
          <Select name="transmission" value={formData.transmission} onValueChange={(value) => handleSelectChange("transmission", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              {transmissions.map(transmission => (
                <SelectItem key={transmission} value={transmission}>
                  {transmission}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <Label htmlFor="fuel_type">Fuel Type*</Label>
          <Select name="fuel_type" value={formData.fuel_type} onValueChange={(value) => handleSelectChange("fuel_type", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              {fuelTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Seating Capacity */}
        <div className="space-y-2">
          <Label htmlFor="seating_capacity">Seating Capacity</Label>
          <Input
            id="seating_capacity"
            name="seating_capacity"
            type="number"
            min="1"
            max="15"
            value={formData.seating_capacity}
            onChange={handleChange}
          />
        </div>

        {/* Kilometers Driven */}
        <div className="space-y-2">
          <Label htmlFor="kilometers_driven">Kilometers Driven</Label>
          <Input
            id="kilometers_driven"
            name="kilometers_driven"
            type="number"
            min="0"
            value={formData.kilometers_driven}
            onChange={handleChange}
          />
        </div>

        {/* Vehicle Condition */}
        <div className="space-y-2">
          <Label htmlFor="vehicle_condition_status">Vehicle Condition*</Label>
          <Select 
            name="vehicle_condition_status" 
            value={formData.vehicle_condition_status} 
            onValueChange={(value) => handleSelectChange("vehicle_condition_status", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {conditionStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Purchase Date */}
        <div className="space-y-2">
          <Label htmlFor="purchase_date">Purchase Date</Label>
          <Input
            id="purchase_date"
            name="purchase_date"
            type="date"
            value={formData.purchase_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Getting Prediction..." : "Predict Purchase Price"}
      </Button>
    </form>
  );
}
