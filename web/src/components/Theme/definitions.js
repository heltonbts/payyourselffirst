const baseColors = {
  black: "#000000",
  red: "#FF647C",
  green: "#0bd9b3",
  blue: "#487fd9",
  yellow: "#EBC455",
};

const brandColors = {
  raisinBlack: "#16171C",
  caribbeanGreen: baseColors.green,
};

const colors = {
  ...baseColors,
  ...brandColors,
};

const fontSizes = [10, 12, 14, 16, 18, 21];

const spaces = [4, 8, 12, 16, 20, 24, 28, 32];

export const definitions = {
  colors,
  fontSizes,
  spaces,
};
