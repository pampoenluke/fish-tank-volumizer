import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface OctagonTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const OctagonTank: React.FC<OctagonTankProps> = ({
  onVolumeChange,
  unit
}) => {
  const [dimensions, setDimensions] = useState({
    width: '',
    height: ''
  });

  useEffect(() => {
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);

    if (width && height) {
      // Regular octagon volume calculation
      const octagonArea = 2 * Math.pow(width, 2) * (1 + Math.sqrt(2));
      const volume = octagonArea * height;
      
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
      
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Side Length ({unit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
          placeholder={`Enter side length in ${unit}`}
        />
      </div>
      <div>
        <Label>Height ({unit})</Label>
        <Input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
          placeholder={`Enter height in ${unit}`}
        />
      </div>
    </div>
  );
};

export default OctagonTank;