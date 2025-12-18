import {valueof} from "@/app/_modules/Types/TypeUtils";

export const MEASUREMENT_CASE_ACT_FORM_FIELD_NAME = {
  ID: 'id',
  SPEAKER: 'meta.speaker',
  CABINET: 'meta.cabinet',
  PORT: 'meta.port',
  CAR: 'meta.car',
  VOLTAGE_OF_TESTING: 'meta.voltageOfTesting',
  IS_DOOR_OPENED: 'meta.isDoorOpened',
  DESCRIPTION: 'meta.description',
  DATA: 'data'
} as const;

export type MeasurementCaseFormFieldName = valueof<typeof MEASUREMENT_CASE_ACT_FORM_FIELD_NAME>;

