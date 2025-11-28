import {valueof} from "@/app/_modules/Types/TypeUtils";
import {PORTS_ENTITIES_FIELD_NAME, PortsEntitiesFieldName} from "@/app/_modules/Constants";

export const PORTS_FIELD_LABEL: {
  [K in PortsEntitiesFieldName]: string
} = {
  [PORTS_ENTITIES_FIELD_NAME.ID]: 'ID',
  [PORTS_ENTITIES_FIELD_NAME.DIAMETER]: 'Диаметр, мм',
  [PORTS_ENTITIES_FIELD_NAME.LENGTH]: 'Длина, см',
  [PORTS_ENTITIES_FIELD_NAME.DESCRIPTION]: 'Описание',
} as const;

export type PortsFieldLabel = valueof<typeof PORTS_FIELD_LABEL>;
