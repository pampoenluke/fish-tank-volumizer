import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BowfrontTankProps {
  dimensions: {
    length: string;
    width: string;
    height: string;
    bowDepth: string;
  };
  unit: string;
  onDimensionChange: (dimension: string, value: string) => void;
}

const BowfrontTank: React.FC<BowfrontTankProps> = ({
  dimensions,
  unit,
  onDimensionChange,
}) => {
  return (
    <>
      <div>
        <Label>Length ({unit})</Label>
        <Input
          type="number"
          value={dimensions.length}
          onChange={(e) => onDimensionChange('length', e.target.value)}
          placeholder={`Enter length in ${unit}`}
        />
      </div>
      <div>
        <Label>Width ({unit})</Label>
        <Input
          type="number"
          value={dimensions.width}
          onChange={(e) => onDimensionChange('width', e.target.value)}
          placeholder={`Enter width in ${unit}`}
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
        <Label>Bow Depth ({unit})</Label>
        <Input
          type="number"
          value={dimensions.bowDepth}
          onChange={(e) => onDimensionChange('bowDepth', e.target.value)}
          placeholder={`Enter bow depth in ${unit}`}
        />
      </div>
    </>
  );
};

export default BowfrontTank;