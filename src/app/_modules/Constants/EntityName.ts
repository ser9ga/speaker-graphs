import { valueof } from '@/app/_modules/Types/TypeUtils';

export const ENTITY_NAME = {
  SPEAKER: 'speaker',
  CABINET: 'cabinet',
  PORT: 'port',
  CAR: 'car'
} as const;

export type EntityName = valueof<typeof ENTITY_NAME>;
