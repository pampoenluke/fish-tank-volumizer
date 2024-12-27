import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VolumeDisplayProps {
  volume: number;
  unit: "gallons" | "liters";
  dimensionUnit: "inches" | "mm";
  onUnitChange: (newUnit: "gallons" | "liters") => void;
  onDimensionUnitChange: (newUnit: "inches" | "mm") => void;
}

const VolumeDisplay = ({ 
  volume, 
  unit, 
  dimensionUnit,
  onUnitChange,
  onDimensionUnitChange 
}: VolumeDisplayProps) => {
  const { toast } = useToast();
  const gallons = unit === 'gallons' ? volume : volume * 0.264172;
  const liters = unit === 'liters' ? volume : volume * 3.78541;

  const handleCopy = () => {
    const text = `Tank Volume:
Gallons: ${gallons.toFixed(2)}
Liters: ${liters.toFixed(2)}`;

    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Tank volume has been copied to clipboard",
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
      <div className="flex justify-between items-start mb-4">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Gallons</p>
          <p className="text-2xl font-bold text-aqua-500">{gallons.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Liters</p>
          <p className="text-2xl font-bold text-aqua-500">{liters.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Volume Unit</label>
          <Select value={unit} onValueChange={(value: "gallons" | "liters") => onUnitChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gallons">Gallons</SelectItem>
              <SelectItem value="liters">Liters</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Dimension Unit</label>
          <Select value={dimensionUnit} onValueChange={(value: "inches" | "mm") => onDimensionUnitChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select dimension unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inches">Inches</SelectItem>
              <SelectItem value="mm">Millimeters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VolumeDisplay;