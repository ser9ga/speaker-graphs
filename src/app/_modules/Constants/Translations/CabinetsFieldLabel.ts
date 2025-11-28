import {valueof} from "@/app/_modules/Types/TypeUtils";
import {CABINETS_ENTITIES_FIELD_NAME, CabinetsEntitiesFieldName} from "@/app/_modules/Constants";

export const CABINETS_FIELD_LABEL: {
  [K in CabinetsEntitiesFieldName]: string
} = {
  [CABINETS_ENTITIES_FIELD_NAME.ID]: 'ID',
  [CABINETS_ENTITIES_FIELD_NAME.VOLUME]: 'Объём',
  [CABINETS_ENTITIES_FIELD_NAME.SPEAKER_SIZE]: 'Размер динамика',
  [CABINETS_ENTITIES_FIELD_NAME.DESCRIPTION]: 'Описание',
} as const;

export type CabinetsFieldLabel = valueof<typeof CABINETS_FIELD_LABEL>;
