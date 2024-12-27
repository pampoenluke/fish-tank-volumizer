import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VolumeDisplayProps {
  gallons: string | number;
  liters: string | number;
  dimensions: {
    length?: string;
    width?: string;
    height?: string;
    diameter?: string;
    bowDepth?: string;
    cornerAngle?: string;
    lshapeLongSide?: string;
    lshapeShortSide?: string;
    glassThickness: string;
  };
  unit: string;
}

const VolumeDisplay = ({ gallons, liters, dimensions, unit }: VolumeDisplayProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    let dimensionsText = '';
    
    // Add dimensions based on what's available
    if (dimensions.length) dimensionsText += `Length: ${dimensions.length} ${unit}\n`;
    if (dimensions.width) dimensionsText += `Width: ${dimensions.width} ${unit}\n`;
    if (dimensions.height) dimensionsText += `Height: ${dimensions.height} ${unit}\n`;
    if (dimensions.diameter) dimensionsText += `Diameter: ${dimensions.diameter} ${unit}\n`;
    if (dimensions.bowDepth) dimensionsText += `Bow Depth: ${dimensions.bowDepth} ${unit}\n`;
    if (dimensions.cornerAngle) dimensionsText += `Corner Angle: ${dimensions.cornerAngle}°\n`;
    if (dimensions.lshapeLongSide) dimensionsText += `L-Shape Long Side: ${dimensions.lshapeLongSide} ${unit}\n`;
    if (dimensions.lshapeShortSide) dimensionsText += `L-Shape Short Side: ${dimensions.lshapeShortSide} ${unit}\n`;
    dimensionsText += `Glass Thickness: ${dimensions.glassThickness} ${unit}\n`;

    const text = `Tank Dimensions:
${dimensionsText}
Tank Volume:
Gallons: ${gallons}
Liters: ${liters}`;

    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Tank dimensions and volume have been copied to clipboard",
        duration: 2000,
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    });
  };

  return (
    <div className="mt-6 p-4 bg-aqua-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Tank Volume</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Gallons</p>
          <p className="text-2xl font-bold text-aqua-500">{gallons}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Liters</p>
          <p className="text-2xl font-bold text-aqua-500">{liters}</p>
        </div>
      </div>
    </div>
  );
};

export default VolumeDisplay;