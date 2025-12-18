import {
  generateEmptyCatalogMeasurementCase,
  getIsFrameEmptyAndValid,
  getIsFrameFilledAndValid
} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {
  CabinetFromCatalogue,
  CarFromCatalogue,
  EditableMeasurementCaseFromCatalogue,
  PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {isNaN} from "lodash";
import {normalizeRawNumber} from "@/app/_modules/Utils/calculateAndPackUnitData/utils";

interface ParseRawCSVStringValueParams {
  rawString: string,
  speakers: SpeakerFromCatalogue[],
  cabinets: CabinetFromCatalogue[],
  ports: PortFromCatalogue[],
  cars: CarFromCatalogue[]
}

export const parseRawCSVStringToMeasurementCase = ({
  rawString,
  speakers,
  cabinets,
  ports,
  cars
}: ParseRawCSVStringValueParams) => {
  const emptyMeasurementCase = generateEmptyCatalogMeasurementCase() as EditableMeasurementCaseFromCatalogue;

  const splitStrings = rawString
    .split('\r\n')
    .map(row => row.split(';'))

  const head = splitStrings.splice(0,3);

  const errors: string[] = []

  const maybeSpeaker = head?.[1]?.[0]
  const speaker = speakers.find(currentSpeaker => {
    return currentSpeaker.label.toLowerCase() === maybeSpeaker?.trim()?.toLowerCase()
  });

  if (speaker) {
    emptyMeasurementCase.meta.speaker = speaker
  } else {
    errors.push(`Не удалось распознать динамик ${maybeSpeaker}`)
  }

  const maybeCabinet = head?.[1]?.[1]

  const cabinet = cabinets.find(currentCabinet => {
    return currentCabinet.volume === Number(maybeCabinet?.trim())
  });

  if (cabinet) {
    emptyMeasurementCase.meta.cabinet = cabinet
  } else {
    errors.push(`Не удалось распознать короб ${maybeCabinet}`)
  }

  const maybePortDiameter = head?.[1]?.[2]
  const maybePortLength = head?.[1]?.[2]

  const port = ports.find(currentPort => {
    return (
      currentPort.diameter === Number(maybePortDiameter?.trim())
      && currentPort.length === Number(maybePortLength?.trim())
    )
  });

  if (port) {
    emptyMeasurementCase.meta.port = port
  } else {
    errors.push(`Не удалось распознать порт ${maybePortDiameter}мм, ${maybePortLength}см`)
  }

  const maybeCar = head?.[1]?.[4]

  const car = cars.find(currentCar => {
    return currentCar.label?.toLowerCase() === maybeCar?.trim()?.toLowerCase()
  });

  if (car) {
    emptyMeasurementCase.meta.car = car
  } else {
    errors.push(`Не удалось распознать автомобиль ${maybeCar}`)
  }

  const maybeDoorSate = head?.[1]?.[5]

  const closedState = (head?.[1]?.[5]?.toLowerCase() as 'открыта' | 'закрыта')

  switch (closedState) {
    case 'открыта': {
      emptyMeasurementCase.meta.isDoorOpened = true
      break
    }

    case 'закрыта': {
      emptyMeasurementCase.meta.isDoorOpened = false
      break
    }

    default: {
      errors.push(`Не удалось распознать состоние двери: ${maybeDoorSate}`)

      _exhaustiveCheck(closedState, {fallBack: null})
    }
  }

  const maybeVoltageOfTesting = Number(head?.[1]?.[6])

  if (!isNaN(maybeVoltageOfTesting)) {
    emptyMeasurementCase.meta.voltageOfTesting = maybeVoltageOfTesting
  } else {
    errors.push(`Не удалось распознать напряжение тестирования ${maybeVoltageOfTesting}`)
  }

  splitStrings.forEach((item) => {
    const maybeFrequency = Number(item[0]);

    if (isNaN(maybeFrequency)) {
      errors.push(`Не удалось распознать частоту кадра измерения ${maybeFrequency}`)
    }

    const maybeFrame = {
      Uin: normalizeRawNumber(item[1]),
      I: normalizeRawNumber(item[2]),
      Pa: normalizeRawNumber(item[3])
    }

    const isFrameFilledAndValid = getIsFrameFilledAndValid(maybeFrame);
    const isFrameEmptyAndValid = getIsFrameEmptyAndValid(maybeFrame);

    if (!isFrameFilledAndValid && !isFrameEmptyAndValid) {
      errors.push(`Не удалось распознать частоту кадра измерения ${maybeFrequency}`)
    }

    if (isFrameFilledAndValid) {
      // @ts-ignore // TODO
      emptyMeasurementCase.data[maybeFrequency] = maybeFrame
    }
  })

  return [emptyMeasurementCase, errors] as const
}
