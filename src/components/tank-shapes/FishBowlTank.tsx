import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FishBowlTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
}

const FishBowlTank: React.FC<FishBowlTankProps> = ({
  onVolumeChange,
  unit,
  dimensionUnit
}) => {
  const [dimensions, setDimensions] = useState({
    diameter: ''
  });

  useEffect(() => {
    const diameter = parseFloat(dimensions.diameter);

    if (diameter) {
      // Calculate volume (sphere = 4/3 * π * r³)
      // We use 0.67 instead of 1 to account for the typical fish bowl shape
      // which is not a complete sphere
      let volume = (4/3 * Math.PI * Math.pow(diameter / 2, 3)) * 0.67;
      
      // Convert from mm³ to in³ if needed
      if (dimensionUnit === 'mm') {
        volume = volume / 16387.064;
      }
      
      // Convert to selected volume unit
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
      
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, dimensionUnit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Diameter ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.diameter}
          onChange={(e) => setDimensions(prev => ({ ...prev, diameter: e.target.value }))}
          placeholder={`Enter diameter in ${dimensionUnit}`}
        />
      </div>
    </div>
  );
};

export default FishBowlTank;