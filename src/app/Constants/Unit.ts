import { MEASURED_UNIT, MeasuredUnit } from '@/app/Constants/MeasuredUnit';
import { CALCULATED_UNIT, CalculatedUnit } from '@/app/Constants/CalculatedUnit';

export const UNIT = {
  ...MEASURED_UNIT,
  ...CALCULATED_UNIT
} as const;

export type Unit = MeasuredUnit | CalculatedUnit;
