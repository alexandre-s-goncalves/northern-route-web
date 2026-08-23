export const alpha = (hexColor: string, percentage: number): string => {
  const cleanHex = hexColor.replace('#', '');

  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);

  const alphaValue = Math.min(Math.max(percentage, 0), 100) / 100;

  return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
};
