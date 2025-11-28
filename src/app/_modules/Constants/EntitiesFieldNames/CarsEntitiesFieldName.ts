import {valueof} from "@/app/_modules/Types/TypeUtils";

export const CARS_ENTITIES_FIELD_NAME = {
  ID: 'id',
  LABEL: 'label',
  DESCRIPTION: 'description',
} as const;

export type CarsEntitiesFieldName = valueof<typeof CARS_ENTITIES_FIELD_NAME>;
