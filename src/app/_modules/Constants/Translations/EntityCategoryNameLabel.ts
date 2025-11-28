import { valueof } from '@/app/_modules/Types/TypeUtils';

export const ENTITY_CATEGORY_NAME_LABEL = {
  SPEAKERS: 'Динамики',
  CABINETS: 'Короба',
  PORTS: 'Порты',
  CARS: 'Машины',
} as const;

export type EntityCategoryNameLabel = valueof<typeof ENTITY_CATEGORY_NAME_LABEL>;
