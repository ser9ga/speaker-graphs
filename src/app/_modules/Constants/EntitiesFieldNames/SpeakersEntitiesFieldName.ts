import {valueof} from "@/app/_modules/Types/TypeUtils";

export const SPEAKERS_ENTITIES_FIELD_NAME = {
  ID: 'id',
  LABEL: 'label',
  COIL_RESISTANCE: 'coilResistance',
  DESCRIPTION: 'description',
} as const;

export type SpeakersEntitiesFieldName = valueof<typeof SPEAKERS_ENTITIES_FIELD_NAME>;
