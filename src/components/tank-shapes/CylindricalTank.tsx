import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CylindricalTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const CylindricalTank: React.FC<CylindricalTankProps> = ({
  onVolumeChange,
  unit
}) => {
  const [dimensions, setDimensions] = useState({
    diameter: '',
    height: ''
  });

  useEffect(() => {
    const diameter = parseFloat(dimensions.diameter);
    const height = parseFloat(dimensions.height);

    if (diameter && height) {
      const radius = diameter / 2;
      const volume = Math.PI * radius * radius * height;
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Diameter ({unit})</Label>
        <Input
          type="number"
          value={dimensions.diameter}
          onChange={(e) => setDimensions(prev => ({ ...prev, diameter: e.target.value }))}
          placeholder={`Enter diameter in ${unit}`}
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

export default CylindricalTank;