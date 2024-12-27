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

type TankShape = 'rectangular' | 'cylindrical' | 'bowfront';

const TankCalculator = () => {
  const [shape, setShape] = useState<TankShape>('rectangular');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    diameter: '',
    bowDepth: '',
    glassThickness: '0.5',
  });

  const calculateVolume = () => {
    let volume = 0;
    const thickness = parseFloat(dimensions.glassThickness) || 0;

    switch (shape) {
      case 'rectangular':
        const l = parseFloat(dimensions.length) - (2 * thickness);
        const w = parseFloat(dimensions.width) - (2 * thickness);
        const h = parseFloat(dimensions.height) - thickness;
        volume = (l * w * h) / 231; // Convert cubic inches to gallons
        break;
      case 'cylindrical':
        const r = (parseFloat(dimensions.diameter) - (2 * thickness)) / 2;
        const height = parseFloat(dimensions.height) - thickness;
        volume = (Math.PI * r * r * height) / 231;
        break;
      case 'bowfront':
        const length = parseFloat(dimensions.length) - (2 * thickness);
        const width = parseFloat(dimensions.width) - (2 * thickness);
        const bowDepth = parseFloat(dimensions.bowDepth) || 0;
        const tankHeight = parseFloat(dimensions.height) - thickness;
        // Average width method for bow front
        const avgWidth = width + (bowDepth / 2);
        volume = (length * avgWidth * tankHeight) / 231;
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
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shape === 'rectangular' && (
              <>
                <div>
                  <Label>Length (inches)</Label>
                  <Input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    placeholder="Enter length"
                  />
                </div>
                <div>
                  <Label>Width (inches)</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder="Enter width"
                  />
                </div>
              </>
            )}

            {shape === 'cylindrical' && (
              <div>
                <Label>Diameter (inches)</Label>
                <Input
                  type="number"
                  value={dimensions.diameter}
                  onChange={(e) => setDimensions({ ...dimensions, diameter: e.target.value })}
                  placeholder="Enter diameter"
                />
              </div>
            )}

            {shape === 'bowfront' && (
              <>
                <div>
                  <Label>Length (inches)</Label>
                  <Input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    placeholder="Enter length"
                  />
                </div>
                <div>
                  <Label>Width (inches)</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder="Enter width"
                  />
                </div>
                <div>
                  <Label>Bow Depth (inches)</Label>
                  <Input
                    type="number"
                    value={dimensions.bowDepth}
                    onChange={(e) => setDimensions({ ...dimensions, bowDepth: e.target.value })}
                    placeholder="Enter bow depth"
                  />
                </div>
              </>
            )}

            <div>
              <Label>Height (inches)</Label>
              <Input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Enter height"
              />
            </div>

            <div>
              <Label>Glass Thickness (inches)</Label>
              <Input
                type="number"
                value={dimensions.glassThickness}
                onChange={(e) => setDimensions({ ...dimensions, glassThickness: e.target.value })}
                placeholder="Enter glass thickness"
                step="0.125"
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