import {valueof} from "@/app/_modules/Types/TypeUtils";

export const CABINETS_ENTITIES_FIELD_NAME = {
  ID: 'id',
  VOLUME: 'volume',
  SPEAKER_SIZE: 'speakerSize',
  DESCRIPTION: 'description',
} as const;

export type CabinetsEntitiesFieldName = valueof<typeof CABINETS_ENTITIES_FIELD_NAME>;

