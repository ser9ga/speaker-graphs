import { valueof } from '@/app/Types/TypeUtils';

export const CALCULATED_UNIT = {
  P: 'P',
  Z: 'Z',
  S: 'S',
  PaUout: 'PaUout',
  PPamax: 'PPamax'
} as const;

export type CalculatedUnit = valueof<typeof CALCULATED_UNIT>;
