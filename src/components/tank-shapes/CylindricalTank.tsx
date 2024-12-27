import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CylindricalTankProps {
  dimensions: {
    diameter: string;
    height: string;
  };
  unit: string;
  onDimensionChange: (dimension: string, value: string) => void;
}

const CylindricalTank: React.FC<CylindricalTankProps> = ({
  dimensions,
  unit,
  onDimensionChange,
}) => {
  return (
    <>
      <div>
        <Label>Diameter ({unit})</Label>
        <Input
          type="number"
          value={dimensions.diameter}
          onChange={(e) => onDimensionChange('diameter', e.target.value)}
          placeholder={`Enter diameter in ${unit}`}
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

export default CylindricalTank;