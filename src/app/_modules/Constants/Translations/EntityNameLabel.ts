import {valueof} from '@/app/_modules/Types/TypeUtils';
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";

export const ENTITY_NAME_LABEL = {
  [ENTITY_NAME.SPEAKER]: 'Динамик',
  [ENTITY_NAME.CABINET]: 'Короб',
  [ENTITY_NAME.PORT]: 'Порт',
  [ENTITY_NAME.CAR]: 'Машина',
} as const;

export type EntityNameLabel = valueof<typeof ENTITY_NAME_LABEL>;
