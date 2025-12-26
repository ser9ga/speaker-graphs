import { valueof } from '@/app/_modules/Types/TypeUtils';

export const LEGEND_COLORS = {
  FUCHSIA: 'Fuchsia',
  DARK_VIOLET: 'DarkViolet',
  RED: 'Red',
  GOLDENROD: 'Goldenrod',
  SIENNA: 'Sienna',
  DARK_ORANGE: 'DarkOrange',
  LIME_GREEN: 'LimeGreen',
  GREEN: 'Green',
  DEEP_SKY_BLUE: 'DeepSkyBlue',
  YELLOW_GREEN: 'YellowGreen',
  CORNFLOWER_BLUE: 'CornflowerBlue',
  MEDIUM_BLUE: 'MediumBlue',
} as const;

export type LegendColors = valueof<typeof LEGEND_COLORS>;
