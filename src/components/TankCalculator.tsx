import { useState } from "react";
import { Card } from "@/components/ui/card";
import RectangularTank from "./tank-shapes/RectangularTank";
import CylindricalTank from "./tank-shapes/CylindricalTank";
import BowfrontTank from "./tank-shapes/BowfrontTank";
import CornerTank from "./tank-shapes/CornerTank";
import LShapeTank from "./tank-shapes/LShapeTank";
import HexagonalTank from "./tank-shapes/HexagonalTank";
import PentagonTank from "./tank-shapes/PentagonTank";
import OctagonTank from "./tank-shapes/OctagonTank";
import HalfCylindricalTank from "./tank-shapes/HalfCylindricalTank";
import FishBowlTank from "./tank-shapes/FishBowlTank";
import VolumeDisplay from "./VolumeDisplay";
import PrintButton from "./PrintButton";
import TankHeader from "./TankHeader";
import TankShapeSelector from "./TankShapeSelector";

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
        return <RectangularTank {...props} isSquare />;
      case "cylindrical":
        return <CylindricalTank {...props} />;
      case "half-cylindrical":
        return <HalfCylindricalTank {...props} />;
      case "fish-bowl":
        return <FishBowlTank {...props} />;
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
      <TankHeader />
      <Card className="w-full max-w-4xl mx-auto p-6">
        <TankShapeSelector 
          selectedShape={selectedShape} 
          onShapeChange={setSelectedShape}
        />
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