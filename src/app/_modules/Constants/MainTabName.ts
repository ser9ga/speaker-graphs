import { valueof } from '@/app/_modules/Types/TypeUtils';

export const MAIN_TAB_NAME = {
  GRAPH_VIEWS: 'graph_views',
  MEASUREMENT_CASE_CATALOG: 'measurement-case-catalog',
  ENTITY_REGISTRY: 'entity-registry'
} as const;

export type MainTabName = valueof<typeof MAIN_TAB_NAME>;
