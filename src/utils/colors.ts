export const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char * 77;
  }
  return hash;
};

// Generate colors for bubbles
export const intToBubbleColor = (int: number) => {
  const hue = Math.abs(int % 360);
  const saturation = 30 + (Math.abs(int % 20));
  const lightness = 80 + (Math.abs(int % 20) - 10); 
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Generate colors for names
export const intToNameColor = (int: number) => {
  const hue = Math.abs(int % 360);
  const saturation = 70 + (Math.abs(int % 20));
  const lightness = 50 + (Math.abs(int % 20) - 10); 
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};