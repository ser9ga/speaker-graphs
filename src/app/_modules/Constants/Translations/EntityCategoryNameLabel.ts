import {valueof} from '@/app/_modules/Types/TypeUtils';
import {ENTITY_CATEGORY_NAME} from "@/app/_modules/Constants/EntityCategoryName";

export const ENTITY_CATEGORY_NAME_LABEL = {
  [ENTITY_CATEGORY_NAME.SPEAKERS]: 'Динамики',
  [ENTITY_CATEGORY_NAME.CABINETS]: 'Короба',
  [ENTITY_CATEGORY_NAME.PORTS]: 'Порты',
  [ENTITY_CATEGORY_NAME.CARS]: 'Машины',
} as const;

export type EntityCategoryNameLabel = valueof<typeof ENTITY_CATEGORY_NAME_LABEL>;
