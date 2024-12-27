import React from 'react';
import { Card } from '@/components/ui/card';

interface VolumeDisplayProps {
  gallons: string | number;
  liters: string | number;
}

const VolumeDisplay = ({ gallons, liters }: VolumeDisplayProps) => {
  return (
    <div className="mt-6 p-4 bg-aqua-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Tank Volume</h2>
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