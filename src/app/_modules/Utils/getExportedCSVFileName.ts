import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {DOOR_STATE_LABEL} from "@/app/_modules/Constants/Translations/DoorStateLabel";
import {DOOR_STATE_NAME} from "@/app/_modules/Constants";

export const getExportedCSVFileName = (rawValues: MeasurementCaseFromCatalogue) => {
  const stringifiedDataValues = [
    rawValues.meta.speaker.label || '',
    rawValues.meta.cabinet.volume || '',
    rawValues.meta.port.diameter || '',
    rawValues.meta.port.length || '',
    rawValues.meta.car.label || '',
    rawValues.meta.isDoorOpened
    ? DOOR_STATE_LABEL[DOOR_STATE_NAME.OPENED]
    : DOOR_STATE_LABEL[DOOR_STATE_NAME.CLOSED],
    `${rawValues.meta.voltageOfTesting}В` || '',
  ].join(';')

  return `${stringifiedDataValues}.csv`;
}
