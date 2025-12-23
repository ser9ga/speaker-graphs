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
import {parseMetaFromCsv} from "@/app/_modules/Utils/parseMetaFromCsv";

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
  const {
    maybeSpeaker,
    maybeCabinet,
    maybePortDiameter,
    maybePortLength,
    maybeCar,
    maybeDoorSate,
    maybeVoltageOfTesting,
    dataRows
  }  = parseMetaFromCsv(rawString)

  const emptyMeasurementCase = generateEmptyCatalogMeasurementCase() as EditableMeasurementCaseFromCatalogue;

  const errors: string[] = []

  const speaker = speakers.find(currentSpeaker => {
    return currentSpeaker.label.toLowerCase() === maybeSpeaker?.trim()?.toLowerCase()
  });

  if (speaker) {
    emptyMeasurementCase.meta.speaker = speaker
  } else {
    errors.push(`Не удалось распознать динамик ${maybeSpeaker}`)
  }

  const cabinet = cabinets.find(currentCabinet => {
    return currentCabinet.volume === Number(maybeCabinet?.trim())
  });

  if (cabinet) {
    emptyMeasurementCase.meta.cabinet = cabinet
  } else {
    errors.push(`Не удалось распознать короб ${maybeCabinet}`)
  }

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

  const car = cars.find(currentCar => {
    return currentCar.label?.toLowerCase() === maybeCar?.replace(/\s+/g, ' ')?.trim()?.toLowerCase()
  });

  if (car) {
    emptyMeasurementCase.meta.car = car
  } else {
    errors.push(`Не удалось распознать автомобиль ${maybeCar}`)
  }

  const closedState = (maybeDoorSate?.toLowerCase() as 'открыта' | 'закрыта')

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

  if (!isNaN(maybeVoltageOfTesting)) {
    emptyMeasurementCase.meta.voltageOfTesting = Number(maybeVoltageOfTesting)
  } else {
    errors.push(`Не удалось распознать напряжение тестирования ${maybeVoltageOfTesting}`)
  }

  dataRows.forEach((item) => {
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
