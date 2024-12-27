import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VolumeDisplayProps {
  gallons: string | number;
  liters: string | number;
}

const VolumeDisplay = ({ gallons, liters }: VolumeDisplayProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    const text = `Tank Volume:
Gallons: ${gallons}
Liters: ${liters}`;

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