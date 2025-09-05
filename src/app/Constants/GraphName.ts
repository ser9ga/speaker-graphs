import { valueof } from '@/app/Types/TypeUtils';

export const GRAPH_NAME = {
  PRESSURE_FROM_TARGET_VOLTAGE: 'pressure-from-target-voltage',
  IMPEDANCE_FROM_TARGET_VOLTAGE: 'impedance-from-target-voltage',
  SENSITIVITY_FROM_TARGET_VOLTAGE: 'sensitivity-from-target-voltage',
  PRESSURE_FROM_GIVEN_VOLTAGE: 'pressure-from-given-voltage',
} as const;

export type GraphName = valueof<typeof GRAPH_NAME>;
