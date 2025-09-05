import { valueof } from '@/app/Types/TypeUtils';

export const HORIZONTAL_SCALE_OPTION = {
  ZOOMED: 'zoomed',
  FULL: 'full'
} as const;

export type HorizontalScaleOption = valueof<typeof HORIZONTAL_SCALE_OPTION>;
