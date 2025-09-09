import { valueof } from '@/app/Types/TypeUtils';

export const MAIN_TAB_NAME = {
  GRAPH_VIEWS: 'graph_views',
  MEASUREMENT_CASE_CATALOG: 'measurement-case-catalog'
} as const;

export type MainTabName = valueof<typeof MAIN_TAB_NAME>;
