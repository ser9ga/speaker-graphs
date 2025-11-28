import { valueof } from '@/app/_modules/Types/TypeUtils';

export const VERTICAL_SCALE_OPTION = {
  ZOOMED: 'zoomed',
  FULL: 'full'
} as const;

export type VerticalScaleOption = valueof<typeof VERTICAL_SCALE_OPTION>;
