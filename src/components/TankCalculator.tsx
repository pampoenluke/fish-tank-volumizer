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

type TankShape = 'rectangular' | 'cylindrical' | 'bowfront' | 'hexagonal' | 'corner' | 'lshape';
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

  const convertToInches = (value: number): number => {
    return unit === 'mm' ? value / 25.4 : value;
  };

  const calculateVolume = () => {
    let volume = 0;
    const thickness = convertToInches(parseFloat(dimensions.glassThickness) || 0);

    switch (shape) {
      case 'rectangular':
        const l = convertToInches(parseFloat(dimensions.length)) - (2 * thickness);
        const w = convertToInches(parseFloat(dimensions.width)) - (2 * thickness);
        const h = convertToInches(parseFloat(dimensions.height)) - thickness;
        volume = (l * w * h) / 231; // Convert cubic inches to gallons
        break;
      case 'cylindrical':
        const r = (convertToInches(parseFloat(dimensions.diameter)) - (2 * thickness)) / 2;
        const height = convertToInches(parseFloat(dimensions.height)) - thickness;
        volume = (Math.PI * r * r * height) / 231;
        break;
      case 'bowfront':
        const length = convertToInches(parseFloat(dimensions.length)) - (2 * thickness);
        const width = convertToInches(parseFloat(dimensions.width)) - (2 * thickness);
        const bowDepth = convertToInches(parseFloat(dimensions.bowDepth) || 0);
        const tankHeight = convertToInches(parseFloat(dimensions.height)) - thickness;
        const avgWidth = width + (bowDepth / 2);
        volume = (length * avgWidth * tankHeight) / 231;
        break;
      case 'hexagonal':
        const side = convertToInches(parseFloat(dimensions.width)) - (2 * thickness);
        const hexHeight = convertToInches(parseFloat(dimensions.height)) - thickness;
        volume = ((3 * Math.sqrt(3) * Math.pow(side, 2) * hexHeight) / 2) / 231;
        break;
      case 'corner':
        const cornerSide = convertToInches(parseFloat(dimensions.width)) - (2 * thickness);
        const cornerHeight = convertToInches(parseFloat(dimensions.height)) - thickness;
        const angle = parseFloat(dimensions.cornerAngle);
        const radians = (angle * Math.PI) / 180;
        volume = (cornerSide * cornerSide * cornerHeight * Math.tan(radians)) / 231;
        break;
      case 'lshape':
        const longSide = convertToInches(parseFloat(dimensions.lshapeLongSide)) - (2 * thickness);
        const shortSide = convertToInches(parseFloat(dimensions.lshapeShortSide)) - (2 * thickness);
        const lHeight = convertToInches(parseFloat(dimensions.height)) - thickness;
        volume = (longSide * shortSide * lHeight) / 231;
        break;
    }

    return {
      gallons: Math.round(volume * 100) / 100,
      liters: Math.round(volume * 3.78541 * 100) / 100,
    };
  };

  const volume = calculateVolume();

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
                  <SelectItem value="cylindrical">Cylindrical</SelectItem>
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
            {shape === 'rectangular' && (
              <>
                <div>
                  <Label>Length ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    placeholder={`Enter length in ${unit}`}
                  />
                </div>
                <div>
                  <Label>Width ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder={`Enter width in ${unit}`}
                  />
                </div>
              </>
            )}

            {shape === 'cylindrical' && (
              <div>
                <Label>Diameter ({unit})</Label>
                <Input
                  type="number"
                  value={dimensions.diameter}
                  onChange={(e) => setDimensions({ ...dimensions, diameter: e.target.value })}
                  placeholder={`Enter diameter in ${unit}`}
                />
              </div>
            )}

            {shape === 'bowfront' && (
              <>
                <div>
                  <Label>Length ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    placeholder={`Enter length in ${unit}`}
                  />
                </div>
                <div>
                  <Label>Width ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder={`Enter width in ${unit}`}
                  />
                </div>
                <div>
                  <Label>Bow Depth ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.bowDepth}
                    onChange={(e) => setDimensions({ ...dimensions, bowDepth: e.target.value })}
                    placeholder={`Enter bow depth in ${unit}`}
                  />
                </div>
              </>
            )}

            {shape === 'hexagonal' && (
              <div>
                <Label>Side Length ({unit})</Label>
                <Input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                  placeholder={`Enter side length in ${unit}`}
                />
              </div>
            )}

            {shape === 'corner' && (
              <>
                <div>
                  <Label>Side Length ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder={`Enter side length in ${unit}`}
                  />
                </div>
                <div>
                  <Label>Corner Angle (degrees)</Label>
                  <Input
                    type="number"
                    value={dimensions.cornerAngle}
                    onChange={(e) => setDimensions({ ...dimensions, cornerAngle: e.target.value })}
                    placeholder="Enter corner angle"
                    min="1"
                    max="179"
                  />
                </div>
              </>
            )}

            {shape === 'lshape' && (
              <>
                <div>
                  <Label>Long Side ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.lshapeLongSide}
                    onChange={(e) => setDimensions({ ...dimensions, lshapeLongSide: e.target.value })}
                    placeholder={`Enter long side in ${unit}`}
                  />
                </div>
                <div>
                  <Label>Short Side ({unit})</Label>
                  <Input
                    type="number"
                    value={dimensions.lshapeShortSide}
                    onChange={(e) => setDimensions({ ...dimensions, lshapeShortSide: e.target.value })}
                    placeholder={`Enter short side in ${unit}`}
                  />
                </div>
              </>
            )}

            <div>
              <Label>Height ({unit})</Label>
              <Input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder={`Enter height in ${unit}`}
              />
            </div>

            <div>
              <Label>Glass Thickness ({unit})</Label>
              <Input
                type="number"
                value={dimensions.glassThickness}
                onChange={(e) => setDimensions({ ...dimensions, glassThickness: e.target.value })}
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