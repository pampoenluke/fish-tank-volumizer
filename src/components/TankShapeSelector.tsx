import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TankShapeSelectorProps {
  selectedShape: string;
  onShapeChange: (value: string) => void;
}

const TankShapeSelector = ({ selectedShape, onShapeChange }: TankShapeSelectorProps) => {
  return (
    <div className="mb-6">
      <label htmlFor="tank-shape" className="block text-sm font-medium mb-2">
        Select Tank Shape
      </label>
      <Select
        value={selectedShape}
        onValueChange={onShapeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tank shape" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rectangular">Rectangular</SelectItem>
          <SelectItem value="square">Square</SelectItem>
          <SelectItem value="cylindrical">Cylindrical</SelectItem>
          <SelectItem value="half-cylindrical">Half Cylindrical</SelectItem>
          <SelectItem value="fish-bowl">Fish Bowl</SelectItem>
          <SelectItem value="bowfront">Bowfront</SelectItem>
          <SelectItem value="corner">Corner</SelectItem>
          <SelectItem value="l-shape">L-Shape</SelectItem>
          <SelectItem value="hexagonal">Hexagonal</SelectItem>
          <SelectItem value="pentagon">Pentagon</SelectItem>
          <SelectItem value="octagon">Octagon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TankShapeSelector;