import { valueof } from '@/app/_modules/Types/TypeUtils';

export const MEASURED_UNIT = {
  Uin: 'Uin',
  I: 'I',
  Pa: 'Pa',
} as const;

export type MeasuredUnit = valueof<typeof MEASURED_UNIT>;
