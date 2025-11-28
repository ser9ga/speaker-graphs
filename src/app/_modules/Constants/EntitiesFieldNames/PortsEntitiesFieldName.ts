import {valueof} from "@/app/_modules/Types/TypeUtils";

export const PORTS_ENTITIES_FIELD_NAME = {
  ID: 'id',
  DIAMETER: 'diameter',
  LENGTH: 'length',
  DESCRIPTION: 'description',
} as const;

export type PortsEntitiesFieldName = valueof<typeof PORTS_ENTITIES_FIELD_NAME>;

