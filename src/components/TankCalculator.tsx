import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import RectangularTank from './tank-shapes/RectangularTank';
import CylindricalTank from './tank-shapes/CylindricalTank';
import BowfrontTank from './tank-shapes/BowfrontTank';
import HexagonalTank from './tank-shapes/HexagonalTank';
import CornerTank from './tank-shapes/CornerTank';
import LShapeTank from './tank-shapes/LShapeTank';
import { calculateVolume } from '@/utils/volumeCalculations';

type TankShape = 'rectangular' | 'square' | 'cylindrical' | 'circle' | 'bowfront' | 'hexagonal' | 'corner' | 'lshape';
type Unit = 'inches' | 'mm';

const TankCalculator = () => {
  const [shape, setShape] = useState<TankShape>('rectangular');
  const [unit, setUnit] = useState<Unit>('inches');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    diameter: '',
    bowDepth: '',
    cornerAngle: '45',
    lshapeLongSide: '',
    lshapeShortSide: '',
    glassThickness: '0.5',
  });

  const handleDimensionChange = (dimension: string, value: string) => {
    setDimensions({ ...dimensions, [dimension]: value });
  };

  const volume = calculateVolume(shape, dimensions, unit, dimensions.glassThickness);

  return (
    <div className="min-h-screen bg-gradient-to-b from-aqua-50 to-white p-4">
      <Card className="max-w-2xl mx-auto p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-aqua-500" />
          <h1 className="text-2xl font-semibold text-gray-800">Aquarium Volume Calculator</h1>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tank Shape</Label>
              <Select value={shape} onValueChange={(value: TankShape) => setShape(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangular">Rectangular</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="cylindrical">Cylindrical</SelectItem>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="bowfront">Bow Front</SelectItem>
                  <SelectItem value="hexagonal">Hexagonal</SelectItem>
                  <SelectItem value="corner">Corner</SelectItem>
                  <SelectItem value="lshape">L-Shape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Unit of Measurement</Label>
              <Select value={unit} onValueChange={(value: Unit) => setUnit(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="mm">Millimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(shape === 'rectangular' || shape === 'square') && (
              <RectangularTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {(shape === 'cylindrical' || shape === 'circle') && (
              <CylindricalTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {shape === 'bowfront' && (
              <BowfrontTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {shape === 'hexagonal' && (
              <HexagonalTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {shape === 'corner' && (
              <CornerTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {shape === 'lshape' && (
              <LShapeTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            <div>
              <Label>Glass Thickness ({unit})</Label>
              <Input
                type="number"
                value={dimensions.glassThickness}
                onChange={(e) => handleDimensionChange('glassThickness', e.target.value)}
                placeholder={`Enter glass thickness in ${unit}`}
                step={unit === 'mm' ? '1' : '0.125'}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-aqua-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tank Volume</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Gallons</p>
                <p className="text-2xl font-bold text-aqua-500">{volume.gallons}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Liters</p>
                <p className="text-2xl font-bold text-aqua-500">{volume.liters}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TankCalculator;