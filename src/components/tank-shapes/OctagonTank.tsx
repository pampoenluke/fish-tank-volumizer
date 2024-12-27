import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface OctagonTankProps {
  dimensions: {
    width: string;
    height: string;
  };
  unit: string;
  onDimensionChange: (dimension: string, value: string) => void;
}

const OctagonTank: React.FC<OctagonTankProps> = ({
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
    </>
  );
};

export default OctagonTank;