import { valueof } from '@/app/_modules/Types/TypeUtils';
import { GRAPH_NAME } from '@/app/_modules/Constants/GraphName';

// TODO camelCase
export const DISPLAYED_GRAPH = {
  ALL: 'all',
  [GRAPH_NAME.PRESSURE_FROM_TARGET_VOLTAGE]: 'pressure-from-target-voltage',
  [GRAPH_NAME.IMPEDANCE_FROM_TARGET_VOLTAGE]: 'impedance-from-target-voltage',
  [GRAPH_NAME.POWER]: 'power',
  [GRAPH_NAME.SENSITIVITY_FROM_TARGET_VOLTAGE]: 'sensitivity-from-target-voltage',
  [GRAPH_NAME.PRESSURE_FROM_GIVEN_VOLTAGE]: 'pressure-from-given-voltage',
} as const;

export type DisplayedGraph = valueof<typeof DISPLAYED_GRAPH>;
