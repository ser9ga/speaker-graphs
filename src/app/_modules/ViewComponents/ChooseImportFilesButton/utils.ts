import {
  generateEmptyGraphMeasurementCase,
  getIsFrameEmptyAndValid,
  getIsFrameFilledAndValid
} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {isNaN} from "lodash";
import {normalizeRawNumber} from "@/app/_modules/Utils/calculateAndPackUnitData/utils";
import {MeasurementCaseForGraph} from "@/app/_modules/Types/dataForGraphs";
import {parseValuesFromCsv} from "@/app/_modules/Utils/parseValuesFromCsv";

interface ParseRawCSVStringValueParams {
  rawString: string
  getRandomColor: () => string
}

export const parseRawCSVStringToGraphData = (
  {rawString, getRandomColor}: ParseRawCSVStringValueParams
): [MeasurementCaseForGraph, string[]] => {
  const parsedValues = parseValuesFromCsv(rawString);

  const {
    maybeSpeaker,
    maybeCabinet,
    maybePortDiameter,
    maybePortLength,
    maybeCar,
    maybeDoorSate,
    maybeVoltageOfTesting,
    dataRows
  } = parsedValues;

  const emptyMeasurementCase = generateEmptyGraphMeasurementCase(getRandomColor());

  const errors: string[] = []

  if (typeof maybeSpeaker === 'string' && maybeSpeaker.length > 0) {
    // @ts-ignore
    emptyMeasurementCase.meta.speaker = {
      label: maybeSpeaker?.trim()
    }
  } else {
    errors.push(`Не удалось распознать динамик "${maybeSpeaker}"`)
  }

  if (typeof maybeCabinet === 'string' && maybeCabinet.length > 0) {
    // @ts-ignore
    emptyMeasurementCase.meta.cabinet = {
      volume: Number(maybeCabinet)
    }
  } else {
    errors.push(`Не удалось распознать короб "${maybeCabinet}"`)
  }

  const portPredicate = typeof maybeSpeaker === 'string'
    && maybeCabinet.length > 0
    && typeof maybePortLength === 'string'
    && maybePortLength.length > 0

  if (portPredicate) {
    // @ts-ignore

    emptyMeasurementCase.meta.port = {
      diameter: Number(maybePortDiameter?.trim()),
      length: Number(maybePortLength?.trim())
    }
  } else {
    errors.push(`Не удалось распознать порт "${maybePortDiameter}"мм, "${maybePortLength}"см`)
  }

  if (typeof maybeCar === 'string' && maybeCar.length > 0) {
    // @ts-ignore
    emptyMeasurementCase.meta.car = {
      label: maybeCar?.trim()
    }
  } else {
    errors.push(`Не удалось распознать автомобиль "${maybeCar}"`)
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
      errors.push(`Не удалось распознать состоние двери: "${maybeDoorSate}"`)

      _exhaustiveCheck(closedState, {fallBack: null})
    }
  }

  if (!isNaN(maybeVoltageOfTesting)) {
    emptyMeasurementCase.meta.voltageOfTesting = maybeVoltageOfTesting
  } else {
    errors.push(`Не удалось распознать напряжение тестирования "${maybeVoltageOfTesting}"`)
  }

  dataRows.forEach((item) => {
    const maybeFrequency = Number(item[0]);

    if (isNaN(maybeFrequency)) {
      errors.push(`Не удалось распознать частоту кадра измерения "${maybeFrequency}"`)
    }

    const maybeFrame = {
      Uin: normalizeRawNumber(item[1]),
      I: normalizeRawNumber(item[2]),
      Pa: normalizeRawNumber(item[3])
    }

    const isFrameFilledAndValid = getIsFrameFilledAndValid(maybeFrame);
    const isFrameEmptyAndValid = getIsFrameEmptyAndValid(maybeFrame);

    if (!isFrameFilledAndValid && !isFrameEmptyAndValid) {
      errors.push(`Некорректный кадр измерения для частоты ${maybeFrequency} гц`)
    }

    if (isFrameFilledAndValid) {
      // @ts-ignore // TODO
      emptyMeasurementCase.data[maybeFrequency] = maybeFrame
    }
  })

  // @ts-ignore
  emptyMeasurementCase.id = [
    // @ts-ignore
    emptyMeasurementCase.meta.speaker?.label,
    // @ts-ignore
    emptyMeasurementCase.meta.cabinet?.volume,
    // @ts-ignore
    `${emptyMeasurementCase.meta.port?.diameter}_${emptyMeasurementCase.meta.port?.length}`,
    // @ts-ignore

    emptyMeasurementCase.meta.car?.label,
    emptyMeasurementCase.meta.isDoorOpened,
    emptyMeasurementCase.meta.voltageOfTesting,
    Math.random().toFixed(5)
  ]
    .join('_');

  return [emptyMeasurementCase as MeasurementCaseForGraph, errors] as const
}
