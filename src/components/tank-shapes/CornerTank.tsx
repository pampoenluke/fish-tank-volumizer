import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CornerTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const CornerTank: React.FC<CornerTankProps> = ({
  onVolumeChange,
  unit
}) => {
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    cornerAngle: '90'
  });

  useEffect(() => {
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    const cornerAngle = parseFloat(dimensions.cornerAngle);

    if (width && height && cornerAngle) {
      const radians = (cornerAngle * Math.PI) / 180;
      const volume = (width * width * height) / (2 * Math.tan(radians / 2));
      
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
      <div>
        <Label>Corner Angle (degrees)</Label>
        <Input
          type="number"
          value={dimensions.cornerAngle}
          onChange={(e) => setDimensions(prev => ({ ...prev, cornerAngle: e.target.value }))}
          placeholder="Enter corner angle"
          min="1"
          max="179"
        />
      </div>
    </div>
  );
};

export default CornerTank;