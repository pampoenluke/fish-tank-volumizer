import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleUnitChange = (newUnit: "gallons" | "liters") => {
    setUnit(newUnit);
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
      
      <Card className="w-full max-w-4xl mx-auto">
        <Tabs defaultValue="rectangular" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="rectangular">Rectangular</TabsTrigger>
            <TabsTrigger value="cylindrical">Cylindrical</TabsTrigger>
            <TabsTrigger value="bowfront">Bowfront</TabsTrigger>
            <TabsTrigger value="corner">Corner</TabsTrigger>
            <TabsTrigger value="l-shape">L-Shape</TabsTrigger>
            <TabsTrigger value="hexagonal">Hexagonal</TabsTrigger>
            <TabsTrigger value="pentagon">Pentagon</TabsTrigger>
            <TabsTrigger value="octagon">Octagon</TabsTrigger>
          </TabsList>

          <VolumeDisplay volume={volume} unit={unit} onUnitChange={handleUnitChange} />

          <TabsContent value="rectangular">
            <RectangularTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="cylindrical">
            <CylindricalTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="bowfront">
            <BowfrontTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="corner">
            <CornerTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="l-shape">
            <LShapeTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="hexagonal">
            <HexagonalTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="pentagon">
            <PentagonTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>

          <TabsContent value="octagon">
            <OctagonTank onVolumeChange={handleVolumeChange} unit={unit} />
          </TabsContent>
        </Tabs>
      </Card>
      <PrintButton />
    </div>
  );
};

export default TankCalculator;