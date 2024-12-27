import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RectangularTank from "./tank-shapes/RectangularTank";
import CylindricalTank from "./tank-shapes/CylindricalTank";
import BowfrontTank from "./tank-shapes/BowfrontTank";
import CornerTank from "./tank-shapes/CornerTank";
import LShapeTank from "./tank-shapes/LShapeTank";
import HexagonalTank from "./tank-shapes/HexagonalTank";
import PentagonTank from "./tank-shapes/PentagonTank";
import OctagonTank from "./tank-shapes/OctagonTank";
import VolumeDisplay from "./VolumeDisplay";
import PrintButton from "./PrintButton";

const TankCalculator = () => {
  const [volume, setVolume] = useState(0);
  const [unit, setUnit] = useState<"gallons" | "liters">("gallons");
  const [dimensionUnit, setDimensionUnit] = useState<"inches" | "mm">("inches");
  const [selectedShape, setSelectedShape] = useState("rectangular");

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleUnitChange = (newUnit: "gallons" | "liters") => {
    setUnit(newUnit);
  };

  const handleDimensionUnitChange = (newUnit: "inches" | "mm") => {
    setDimensionUnit(newUnit);
  };

  const renderSelectedTank = () => {
    const props = {
      onVolumeChange: handleVolumeChange,
      unit,
      dimensionUnit,
    };

    switch (selectedShape) {
      case "rectangular":
        return <RectangularTank {...props} />;
      case "square":
        return <RectangularTank {...props} isSquare={true} />;
      case "cylindrical":
        return <CylindricalTank {...props} />;
      case "bowfront":
        return <BowfrontTank {...props} />;
      case "corner":
        return <CornerTank {...props} />;
      case "l-shape":
        return <LShapeTank {...props} />;
      case "hexagonal":
        return <HexagonalTank {...props} />;
      case "pentagon":
        return <PentagonTank {...props} />;
      case "octagon":
        return <OctagonTank {...props} />;
      default:
        return <RectangularTank {...props} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <img 
          src="/fish-tank-logo.png" 
          alt="calculate fish tank volume" 
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold text-center mb-6">
          Calculate Fish Tank Volume
        </h1>
      </div>
      
      <Card className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <label htmlFor="tank-shape" className="block text-sm font-medium mb-2">
            Select Tank Shape
          </label>
          <Select
            value={selectedShape}
            onValueChange={setSelectedShape}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tank shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangular">Rectangular</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="cylindrical">Cylindrical</SelectItem>
              <SelectItem value="bowfront">Bowfront</SelectItem>
              <SelectItem value="corner">Corner</SelectItem>
              <SelectItem value="l-shape">L-Shape</SelectItem>
              <SelectItem value="hexagonal">Hexagonal</SelectItem>
              <SelectItem value="pentagon">Pentagon</SelectItem>
              <SelectItem value="octagon">Octagon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <VolumeDisplay 
          volume={volume} 
          unit={unit} 
          dimensionUnit={dimensionUnit}
          onUnitChange={handleUnitChange}
          onDimensionUnitChange={handleDimensionUnitChange}
        />

        {renderSelectedTank()}
      </Card>
      <PrintButton />
    </div>
  );
};

export default TankCalculator;