import {valueof} from "@/app/_modules/Types/TypeUtils";

export const MEASUREMENT_CASE_TABLE_COLUMN_NAME = {
  ID: 'id',
  COLOR: 'color',
  SPEAKER_LABEL: 'meta.speaker.label',
  SPEAKER_COIL_RESISTANCE: 'meta.speaker.coilResistance',
  SPEAKER_SIZE: 'meta.speaker.size',
  CABINET_VOLUME: 'meta.cabinet.volume',
  PORT_DIAMETER: 'meta.port.diameter',
  PORT_LENGTH: 'meta.port.length',
  CAR_LABEL: 'meta.car.label',
  VOLTAGE_OF_TESTING: 'meta.voltageOfTesting',
  IS_DOOR_OPENED: 'meta.isDoorOpened',
  DESCRIPTION: 'meta.description'
} as const;

export type MeasurementCaseTableColumnName = valueof<typeof MEASUREMENT_CASE_TABLE_COLUMN_NAME>;
