import {valueof} from "@/app/_modules/Types/TypeUtils";

export const MEASUREMENT_CASE_TABLE_COLUMN_NAME = {
  ID: 'id',
  COLOR: 'color',
  SPEAKER_LABEL: 'speakerLabel',
  SPEAKER_COIL_RESISTANCE: 'speakerCoilResistance',
  SPEAKER_SIZE: 'speakerSize',
  CABINET_VOLUME: 'cabinetVolume',
  PORT_DIAMETER: 'portDiameter',
  PORT_LENGTH: 'portLength',
  CAR_LABEL: 'carLabel',
  VOLTAGE_OF_TESTING: 'voltageOfTesting',
  IS_DOOR_OPENED: 'isDoorOpened',
  DESCRIPTION: 'description'

} as const;

export type MeasurementCaseTableColumnName = valueof<typeof MEASUREMENT_CASE_TABLE_COLUMN_NAME>;
