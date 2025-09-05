import { valueof } from '@/app/Types/TypeUtils';

export const LEGEND_COLORS = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  CYAN: 'cyan',
  ORANGE: 'orange',
  YELLOW: 'yellow'
} as const;

export type LegendColors = valueof<typeof LEGEND_COLORS>;
