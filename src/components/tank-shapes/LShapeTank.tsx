import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LShapeTankProps {
  dimensions: {
    lshapeLongSide: string;
    lshapeShortSide: string;
    height: string;
  };
  unit: string;
  onDimensionChange: (dimension: string, value: string) => void;
}

const LShapeTank: React.FC<LShapeTankProps> = ({
  dimensions,
  unit,
  onDimensionChange,
}) => {
  return (
    <>
      <div>
        <Label>Long Side ({unit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeLongSide}
          onChange={(e) => onDimensionChange('lshapeLongSide', e.target.value)}
          placeholder={`Enter long side in ${unit}`}
        />
      </div>
      <div>
        <Label>Short Side ({unit})</Label>
        <Input
          type="number"
          value={dimensions.lshapeShortSide}
          onChange={(e) => onDimensionChange('lshapeShortSide', e.target.value)}
          placeholder={`Enter short side in ${unit}`}
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

export default LShapeTank;