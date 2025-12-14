import { valueof } from '@/app/_modules/Types/TypeUtils';

export const ENTITY_CATEGORY_NAME = {
  SPEAKERS: 'speakers',
  CABINETS: 'cabinets',
  PORTS: 'ports',
  CARS: 'cars'
} as const;

export type EntityCategoryName = valueof<typeof ENTITY_CATEGORY_NAME>;
