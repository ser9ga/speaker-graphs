import {valueof} from "@/app/_modules/Types/TypeUtils";
import {
  MEASUREMENT_CASE_TABLE_COLUMN_NAME,
  MeasurementCaseTableColumnName
} from "@/app/_modules/Constants";

export const MEASUREMENT_CASE_TABLE_COLUMN_LABEL: {
  [K in MeasurementCaseTableColumnName]: string
} = {
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]: 'ID',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR]: 'Цвет',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]: 'Динамик',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]: 'Сопротивление (Ом)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]: 'Размер (д)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]: 'Объём (л)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]: 'Диаметр порта (мм)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]: 'Длинна порта (см)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]: 'Автомобиль',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]: 'Напряжения тестировния (В)',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED]: 'Состояние двери',
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]: 'Описание',
} as const;

export type MeasurementCaseTableColumnLabel = valueof<typeof MEASUREMENT_CASE_TABLE_COLUMN_LABEL>;
