import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {DOOR_STATE_LABEL} from "@/app/_modules/Constants/Translations/DoorStateLabel";
import {DOOR_STATE_NAME} from "@/app/_modules/Constants";

export const parseMeasuringCaseFromCatalogToCSV = (rawValues: MeasurementCaseFromCatalogue) => {
  const firstRow = [
    'Динамик',
    'Короб',
    'D порта',
    'L порта',
    'Машина',
    'Дверь',
    'Напр. тест.'
  ]

  const secRow = [
    rawValues.meta.speaker?.label || '',
    rawValues.meta.cabinet?.volume || '',
    String(rawValues.meta.port?.diameter) || '_',
    String(rawValues.meta.port?.length) || '_',
    rawValues.meta.car?.label || '',
    rawValues.meta.isDoorOpened
      ? DOOR_STATE_LABEL[DOOR_STATE_NAME.OPENED]
      : DOOR_STATE_LABEL[DOOR_STATE_NAME.CLOSED],
    String(rawValues.meta.voltageOfTesting) || '_',
  ]

  const thirdRow = [
    'F',
    'Uin',
    'I',
    'Pa'
  ]

  const normalize = (raw: number | null) => {
    if (raw === null) {
      return '';
    }

    return String(raw).replace('.', ',')
  };

  const dataRowsCollection = Object.entries(rawValues.data)
    .map(([key, frameDate]) => {
      console.log('String(frameDate.Uin).replace(\'.\', \',\') || \'\'', String(frameDate.Uin).replace('.', ',') || '')
      return [
        String(key) || '',
        normalize(frameDate.Uin),
        normalize(frameDate.I),
        normalize(frameDate.Pa),
      ]
    })

  const rawStrings = [
    firstRow,
    secRow,
    thirdRow,
    ...dataRowsCollection
  ]

  return rawStrings
    .map(row => row
      .join(';')
    )
    .join('\r\n');
}
