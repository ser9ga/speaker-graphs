import {valueof} from "@/app/_modules/Types/TypeUtils";

import {
  SPEAKERS_ENTITIES_FIELD_NAME,
  SpeakersEntitiesFieldName
} from "@/app/_modules/Constants/EntitiesFieldNames/SpeakersEntitiesFieldName";

export const SPEAKERS_FIELD_LABEL: {
  [K in SpeakersEntitiesFieldName]: string
} = {
  [SPEAKERS_ENTITIES_FIELD_NAME.ID]: 'ID',
  [SPEAKERS_ENTITIES_FIELD_NAME.LABEL]: 'Название',
  [SPEAKERS_ENTITIES_FIELD_NAME.COIL_RESISTANCE]: 'Сопротивление',
  [SPEAKERS_ENTITIES_FIELD_NAME.DESCRIPTION]: 'Описание',
} as const;

export type SpeakersFieldLabel = valueof<typeof SPEAKERS_FIELD_LABEL>;
