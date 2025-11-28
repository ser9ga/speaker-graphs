import {valueof} from "@/app/_modules/Types/TypeUtils";
import {CARS_ENTITIES_FIELD_NAME, CarsEntitiesFieldName} from "@/app/_modules/Constants";

export const CARS_FIELD_LABEL: {
  [K in CarsEntitiesFieldName]: string
} = {
  [CARS_ENTITIES_FIELD_NAME.ID]: 'ID',
  [CARS_ENTITIES_FIELD_NAME.LABEL]: 'Название',
  [CARS_ENTITIES_FIELD_NAME.DESCRIPTION]: 'Описание',
} as const;

export type CarsFieldLabel = valueof<typeof CARS_FIELD_LABEL>;
