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
import { Calculator, Square, Circle, Hexagon, Rectangle } from 'lucide-react';
import RectangularTank from './tank-shapes/RectangularTank';
import CylindricalTank from './tank-shapes/CylindricalTank';
import BowfrontTank from './tank-shapes/BowfrontTank';
import HexagonalTank from './tank-shapes/HexagonalTank';
import CornerTank from './tank-shapes/CornerTank';
import LShapeTank from './tank-shapes/LShapeTank';
import PentagonTank from './tank-shapes/PentagonTank';
import OctagonTank from './tank-shapes/OctagonTank';
import { calculateVolume } from '@/utils/volumeCalculations';

type TankShape = 'rectangular' | 'square' | 'cylindrical' | 'circle' | 'bowfront' | 'hexagonal' | 'corner' | 'lshape' | 'pentagon' | 'octagon';
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

  const getShapeIcon = (shape: TankShape) => {
    switch (shape) {
      case 'square':
        return <Square className="w-5 h-5" />;
      case 'circle':
      case 'cylindrical':
        return <Circle className="w-5 h-5" />;
      case 'hexagonal':
        return <Hexagon className="w-5 h-5" />;
      case 'rectangular':
      default:
        return <Rectangle className="w-5 h-5" />;
    }
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
                  <div className="flex items-center gap-2">
                    {getShapeIcon(shape)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangular">
                    <div className="flex items-center gap-2">
                      <Rectangle className="w-5 h-5" />
                      Rectangular
                    </div>
                  </SelectItem>
                  <SelectItem value="square">
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5" />
                      Square
                    </div>
                  </SelectItem>
                  <SelectItem value="cylindrical">
                    <div className="flex items-center gap-2">
                      <Circle className="w-5 h-5" />
                      Cylindrical
                    </div>
                  </SelectItem>
                  <SelectItem value="circle">
                    <div className="flex items-center gap-2">
                      <Circle className="w-5 h-5" />
                      Circle
                    </div>
                  </SelectItem>
                  <SelectItem value="bowfront">
                    <div className="flex items-center gap-2">
                      <Rectangle className="w-5 h-5" />
                      Bow Front
                    </div>
                  </SelectItem>
                  <SelectItem value="hexagonal">
                    <div className="flex items-center gap-2">
                      <Hexagon className="w-5 h-5" />
                      Hexagonal
                    </div>
                  </SelectItem>
                  <SelectItem value="corner">
                    <div className="flex items-center gap-2">
                      <Rectangle className="w-5 h-5 rotate-45" />
                      Corner
                    </div>
                  </SelectItem>
                  <SelectItem value="lshape">
                    <div className="flex items-center gap-2">
                      <Rectangle className="w-5 h-5" />
                      L-Shape
                    </div>
                  </SelectItem>
                  <SelectItem value="pentagon">
                    <div className="flex items-center gap-2">
                      <Hexagon className="w-5 h-5" />
                      Pentagon
                    </div>
                  </SelectItem>
                  <SelectItem value="octagon">
                    <div className="flex items-center gap-2">
                      <Hexagon className="w-5 h-5" />
                      Octagon
                    </div>
                  </SelectItem>
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

            {shape === 'pentagon' && (
              <PentagonTank
                dimensions={dimensions}
                unit={unit}
                onDimensionChange={handleDimensionChange}
              />
            )}

            {shape === 'octagon' && (
              <OctagonTank
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
