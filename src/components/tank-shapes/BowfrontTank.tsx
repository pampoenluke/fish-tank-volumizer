import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BowfrontTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
}

const BowfrontTank: React.FC<BowfrontTankProps> = ({
  onVolumeChange,
  unit,
  dimensionUnit
}) => {
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    bowDepth: ''
  });

  useEffect(() => {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    const bowDepth = parseFloat(dimensions.bowDepth);

    if (length && width && height && bowDepth) {
      let baseVolume = length * width * height;
      let bowVolume = (Math.PI * bowDepth * width * height) / 4;
      let totalVolume = baseVolume + bowVolume;
      
      // Convert from mm³ to in³ if needed
      if (dimensionUnit === 'mm') {
        totalVolume = totalVolume / 16387.064;
      }
      
      const volumeInSelectedUnit = unit === 'gallons' 
        ? totalVolume * 0.004329 // Convert cubic inches to gallons
        : totalVolume * 0.016387; // Convert cubic inches to liters
      
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
      <div>
        <Label>Bow Depth ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.bowDepth}
          onChange={(e) => setDimensions(prev => ({ ...prev, bowDepth: e.target.value }))}
          placeholder={`Enter bow depth in ${dimensionUnit}`}
        />
      </div>
    </div>
  );
};

export default BowfrontTank;