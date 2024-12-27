import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CornerTankProps {
  dimensions: {
    width: string;
    height: string;
    cornerAngle: string;
  };
  unit: string;
  onDimensionChange: (dimension: string, value: string) => void;
}

const CornerTank: React.FC<CornerTankProps> = ({
  dimensions,
  unit,
  onDimensionChange,
}) => {
  return (
    <>
      <div>
        <Label>Side Length ({unit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => onDimensionChange('width', e.target.value)}
          placeholder={`Enter side length in ${unit}`}
        />
      </div>
      <div>
        <Label>Height ({unit})</Label>
        <Input
          type="number"
          value={dimensions.height}
          onChange={(e) => onDimensionChange('height', e.target.value)}
          placeholder={`Enter height in ${unit}`}
        />
      </div>
      <div>
        <Label>Corner Angle (degrees)</Label>
        <Input
          type="number"
          value={dimensions.cornerAngle}
          onChange={(e) => onDimensionChange('cornerAngle', e.target.value)}
          placeholder="Enter corner angle"
          min="1"
          max="179"
        />
      </div>
    </>
  );
};

export default CornerTank;