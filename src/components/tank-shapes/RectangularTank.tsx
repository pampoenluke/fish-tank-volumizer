import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RectangularTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
}

const RectangularTank: React.FC<RectangularTankProps> = ({
  onVolumeChange,
  unit,
  dimensionUnit
}) => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });

  useEffect(() => {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);

    if (length && width && height) {
      // Calculate base volume
      let volume = length * width * height;
      
      // Convert from mm³ to in³ if needed
      if (dimensionUnit === 'mm') {
        volume = volume / 16387.064; // Convert mm³ to in³
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
        <Label>Length ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
          placeholder={`Enter length in ${dimensionUnit}`}
        />
      </div>
      <div>
        <Label>Width ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
          placeholder={`Enter width in ${dimensionUnit}`}
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

export default RectangularTank;