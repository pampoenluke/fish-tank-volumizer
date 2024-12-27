const CUBIC_INCHES_TO_GALLONS = 0.004329;
const CUBIC_MM_TO_LITERS = 0.000001;

export const calculateVolume = (
  shape: string,
  dimensions: any,
  unit: string,
  glassThickness: string
) => {
  let volume = 0;
  const thickness = parseFloat(glassThickness) || 0;

  // Convert all dimensions to numbers and adjust for glass thickness
  const length = parseFloat(dimensions.length) - 2 * thickness;
  const width = parseFloat(dimensions.width) - 2 * thickness;
  const height = parseFloat(dimensions.height) - thickness;
  const diameter = parseFloat(dimensions.diameter) - 2 * thickness;
  const bowDepth = parseFloat(dimensions.bowDepth);
  const cornerAngle = parseFloat(dimensions.cornerAngle);
  const lshapeLongSide = parseFloat(dimensions.lshapeLongSide) - 2 * thickness;
  const lshapeShortSide = parseFloat(dimensions.lshapeShortSide) - 2 * thickness;

  switch (shape) {
    case 'rectangular':
      volume = length * width * height;
      break;
    case 'square':
      volume = width * width * height;
      break;
    case 'cylindrical':
    case 'circle':
      volume = Math.PI * Math.pow(diameter / 2, 2) * height;
      break;
    case 'bowfront':
      // Approximate bowfront volume using rectangular + partial cylinder
      const baseVolume = length * width * height;
      const bowVolume = (Math.PI * bowDepth * width * height) / 4;
      volume = baseVolume + bowVolume;
      break;
    case 'hexagonal':
      // Regular hexagon
      volume = (3 * Math.sqrt(3) * Math.pow(width, 2) * height) / 2;
      break;
    case 'corner':
      // Corner tank using angle
      const radians = (cornerAngle * Math.PI) / 180;
      volume = (width * width * height) / (2 * Math.tan(radians / 2));
      break;
    case 'lshape':
      // L-shaped tank
      volume = (lshapeLongSide * width + lshapeShortSide * (width - thickness)) * height;
      break;
    case 'pentagon':
      // Regular pentagon
      const pentagonArea = (5 * Math.pow(width, 2) * Math.tan(Math.PI / 5)) / 4;
      volume = pentagonArea * height;
      break;
    case 'octagon':
      // Regular octagon
      const octagonArea = 2 * Math.pow(width, 2) * (1 + Math.sqrt(2));
      volume = octagonArea * height;
      break;
    default:
      volume = 0;
  }

  // Convert to gallons/liters based on unit
  const gallons = unit === 'inches' ? volume * CUBIC_INCHES_TO_GALLONS : volume * CUBIC_MM_TO_LITERS * 0.264172;
  const liters = unit === 'inches' ? volume * CUBIC_INCHES_TO_GALLONS * 3.78541 : volume * CUBIC_MM_TO_LITERS;

  return {
    gallons: isNaN(gallons) ? '0' : gallons.toFixed(2),
    liters: isNaN(liters) ? '0' : liters.toFixed(2),
  };
};