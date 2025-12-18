'use client'

import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {
  MEASUREMENT_CASE_TABLE_COLUMN_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseTableColumnLabel";

export const columns = [
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR,
      width: 30,
      label: 'Цвет'
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID,
      width: 60,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL,
      path: 'meta.speaker.label',
      width: 300,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE,
      path: 'meta.speaker.coilResistance',
      width: 60,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE,
      path: 'meta.speaker.size',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME,
      path: 'meta.cabinet.volume',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER,
      path: 'meta.port.diameter',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH,
      path: 'meta.port.length',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL,
      path: 'meta.car.label',
      width: 160,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING,
      path: 'meta.voltageOfTesting',
      width: 150,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED,
      path: 'meta.isDoorOpened',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED],
      cellValue: (rawCell: MeasurementCaseFromCatalogue) => rawCell.meta.isDoorOpened
        ? "открыта"
        : "закрыта"
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION,
      path: 'meta.description',
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]
    },
]
