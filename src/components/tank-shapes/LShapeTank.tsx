import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LShapeTankProps {
  onVolumeChange: (volume: number) => void;
  unit: "gallons" | "liters";
}

const LShapeTank: React.FC<LShapeTankProps> = ({
  onVolumeChange,
  unit
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
      const volume = (longSide * shortSide * height);
      
      const volumeInSelectedUnit = unit === 'gallons' 
        ? volume * 0.004329 // Convert cubic inches to gallons
        : volume * 0.016387; // Convert cubic inches to liters
      
      onVolumeChange(volumeInSelectedUnit);
    }
  }, [dimensions, unit, onVolumeChange]);

  return (
    <div className="grid gap-4 p-4">
      <div>
        <Label>Long Side ({unit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeLongSide}
          onChange={(e) => setDimensions(prev => ({ ...prev, lshapeLongSide: e.target.value }))}
          placeholder={`Enter long side in ${unit}`}
        />
      </div>
      <div>
        <Label>Short Side ({unit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeShortSide}
          onChange={(e) => setDimensions(prev => ({ ...prev, lshapeShortSide: e.target.value }))}
          placeholder={`Enter short side in ${unit}`}
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

export default LShapeTank;