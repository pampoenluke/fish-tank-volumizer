export const convertToInches = (value: number, unit: string): number => {
  return unit === 'mm' ? value / 25.4 : value;
};

export const calculateVolume = (
  shape: string,
  dimensions: any,
  unit: string,
  glassThickness: string
) => {
  let volume = 0;
  const thickness = convertToInches(parseFloat(glassThickness) || 0, unit);

  switch (shape) {
    case 'rectangular':
    case 'square':
      const l = convertToInches(parseFloat(dimensions.length), unit) - 2 * thickness;
      const w = convertToInches(parseFloat(dimensions.width), unit) - 2 * thickness;
      const h = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      volume = (l * w * h) / 231;
      break;
    case 'cylindrical':
    case 'circle':
      const r = (convertToInches(parseFloat(dimensions.diameter), unit) - 2 * thickness) / 2;
      const height = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      volume = (Math.PI * r * r * height) / 231;
      break;
    case 'bowfront':
      const length = convertToInches(parseFloat(dimensions.length), unit) - 2 * thickness;
      const width = convertToInches(parseFloat(dimensions.width), unit) - 2 * thickness;
      const bowDepth = convertToInches(parseFloat(dimensions.bowDepth) || 0, unit);
      const tankHeight = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      const avgWidth = width + bowDepth / 2;
      volume = (length * avgWidth * tankHeight) / 231;
      break;
    case 'hexagonal':
      const side = convertToInches(parseFloat(dimensions.width), unit) - 2 * thickness;
      const hexHeight = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      volume = ((3 * Math.sqrt(3) * Math.pow(side, 2) * hexHeight) / 2) / 231;
      break;
    case 'corner':
      const cornerSide = convertToInches(parseFloat(dimensions.width), unit) - 2 * thickness;
      const cornerHeight = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      const angle = parseFloat(dimensions.cornerAngle);
      const radians = (angle * Math.PI) / 180;
      volume = (cornerSide * cornerSide * cornerHeight * Math.tan(radians)) / 231;
      break;
    case 'lshape':
      const longSide = convertToInches(parseFloat(dimensions.lshapeLongSide), unit) - 2 * thickness;
      const shortSide = convertToInches(parseFloat(dimensions.lshapeShortSide), unit) - 2 * thickness;
      const lHeight = convertToInches(parseFloat(dimensions.height), unit) - thickness;
      volume = (longSide * shortSide * lHeight) / 231;
      break;
  }

  return {
    gallons: Math.round(volume * 100) / 100,
    liters: Math.round(volume * 3.78541 * 100) / 100,
  };
};