import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BowfrontTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const BowfrontTank: React.FC<BowfrontTankProps> = ({
  onVolumeChange,
  unit
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
      // Calculate base volume (rectangular part)
      const baseVolume = length * width * height;
      // Add bow front volume (approximation using partial cylinder)
      const bowVolume = (Math.PI * bowDepth * width * height) / 4;
      const totalVolume = baseVolume + bowVolume;
      
      const volumeInSelectedUnit = unit === 'gallons' 
        ? totalVolume * 0.004329 // Convert cubic inches to gallons
        : totalVolume * 0.016387; // Convert cubic inches to liters
      
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Length ({unit})</Label>
        <Input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
          placeholder={`Enter length in ${unit}`}
        />
      </div>
      <div>
        <Label>Width ({unit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
          placeholder={`Enter width in ${unit}`}
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
      <div>
        <Label>Bow Depth ({unit})</Label>
        <Input
          type="number"
          value={dimensions.bowDepth}
          onChange={(e) => setDimensions(prev => ({ ...prev, bowDepth: e.target.value }))}
          placeholder={`Enter bow depth in ${unit}`}
        />
      </div>
    </div>
  );
};

export default BowfrontTank;