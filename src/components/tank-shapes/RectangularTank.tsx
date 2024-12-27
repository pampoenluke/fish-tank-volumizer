import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RectangularTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const RectangularTank: React.FC<RectangularTankProps> = ({
  onVolumeChange,
  unit
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
      // Calculate volume in the selected unit
      const volume = length * width * height;
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
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
    </div>
  );
};

export default RectangularTank;