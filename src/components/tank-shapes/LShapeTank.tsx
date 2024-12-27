import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LShapeTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
}

const LShapeTank: React.FC<LShapeTankProps> = ({
  onVolumeChange,
  unit,
  dimensionUnit
}) => {
  const [dimensions, setDimensions] = useState({
    lshapeLongSide: '',
    lshapeShortSide: '',
    height: ''
  });

  useEffect(() => {
    const longSide = parseFloat(dimensions.lshapeLongSide);
    const shortSide = parseFloat(dimensions.lshapeShortSide);
    const height = parseFloat(dimensions.height);

    if (longSide && shortSide && height) {
      let volume = (longSide * shortSide * height);
      
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
        <Label>Long Side ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeLongSide}
          onChange={(e) => setDimensions(prev => ({ ...prev, lshapeLongSide: e.target.value }))}
          placeholder={`Enter long side in ${dimensionUnit}`}
        />
      </div>
      <div>
        <Label>Short Side ({dimensionUnit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeShortSide}
          onChange={(e) => setDimensions(prev => ({ ...prev, lshapeShortSide: e.target.value }))}
          placeholder={`Enter short side in ${dimensionUnit}`}
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

export default LShapeTank;