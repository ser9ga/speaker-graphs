import { valueof } from '@/app/_modules/Types/TypeUtils';

export const ENTITY_CATEGORY = {
  SPEAKERS: 'speakers',
  CABINETS: 'cabinets',
  PORTS: 'ports',
  CARS: 'cars'
} as const;

export type EntityCategory = valueof<typeof ENTITY_CATEGORY>;
