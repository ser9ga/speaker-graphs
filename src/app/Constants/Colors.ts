import { valueof } from '@/app/Types/TypeUtils';

export const LEGEND_COLORS = {
  FUCHSIA: 'Fuchsia',
  DARK_VIOLET: 'DarkViolet',
  RED: 'Red',
  GOLDENROD: 'Goldenrod',
  SIENNA: 'Sienna',
  ORANGE_RED: 'OrangeRed',
  LIME: 'Lime',
  GREEN: 'Green',
  AQUA: 'Aqua',
  TEAL: 'Teal',
  ROYAL_BLUE: 'RoyalBlue',
  NAVY: 'Navy',
} as const;

export type LegendColors = valueof<typeof LEGEND_COLORS>;
