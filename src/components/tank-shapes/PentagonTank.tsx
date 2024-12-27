import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PentagonTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
}

const PentagonTank: React.FC<PentagonTankProps> = ({
  onVolumeChange,
  unit,
  dimensionUnit
}) => {
  const [dimensions, setDimensions] = useState({
    width: '',
    height: ''
  });

  useEffect(() => {
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);

    if (width && height) {
      const pentagonArea = (5 * Math.pow(width, 2) * Math.tan(Math.PI / 5)) / 4;
      let volume = pentagonArea * height;
      
      // Convert from mm³ to in³ if needed
      if (dimensionUnit === 'mm') {
        volume = volume / 16387.064;
      }
      
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
      
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, dimensionUnit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Side Length ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
          placeholder={`Enter side length in ${dimensionUnit}`}
        />
      </div>
      <div>
        <Label>Height ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
          placeholder={`Enter height in ${dimensionUnit}`}
        />
      </div>
    </div>
  );
};

export default PentagonTank;