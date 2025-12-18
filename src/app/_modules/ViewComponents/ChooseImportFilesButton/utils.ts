import {
  generateEmptyGraphMeasurementCase,
  getIsFrameEmptyAndValid,
  getIsFrameFilledAndValid
} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {isNaN} from "lodash";
import {normalizeRawNumber} from "@/app/_modules/Utils/calculateAndPackUnitData/utils";
import {MeasurementCaseForGraph} from "@/app/_modules/Types/dataForGraphs";

interface ParseRawCSVStringValueParams {
  rawString: string
  getRandomColor: () => string
}

export const parseRawCSVStringToGraphData = ({rawString, getRandomColor}: ParseRawCSVStringValueParams):
  [MeasurementCaseForGraph, string[]] => {
  const emptyMeasurementCase = generateEmptyGraphMeasurementCase(getRandomColor());

  const splitStrings = rawString
    .split('\r\n')
    .map(row => row.split(';'))

  const head = splitStrings.splice(0,3);

  const errors: string[] = []

  const maybeSpeaker = head?.[1]?.[0]

  if (typeof maybeSpeaker === 'string' && maybeSpeaker.length > 0) {
    emptyMeasurementCase.meta.speaker = {
      label: maybeSpeaker?.trim()
    }
  } else {
    errors.push(`Не удалось распознать динамик ${maybeSpeaker}`)
  }

  const maybeCabinet = head?.[1]?.[1]

  if (typeof maybeCabinet === 'string' && maybeCabinet.length > 0) {
    emptyMeasurementCase.meta.cabinet = {
      volume: Number(maybeCabinet)
    }
  } else {
    errors.push(`Не удалось распознать короб ${maybeCabinet}`)
  }

  const maybePortDiameter = head?.[1]?.[2]
  const maybePortLength = head?.[1]?.[2]

  const portPredicate = typeof maybeSpeaker === 'string'
    && maybeCabinet.length > 0
    && typeof maybePortLength === 'string'
    && maybePortLength.length > 0

  if (portPredicate) {
    emptyMeasurementCase.meta.port = {
      diameter: Number(maybePortDiameter?.trim()),
      length: Number(maybePortLength?.trim())
    }
  } else {
    errors.push(`Не удалось распознать порт ${maybePortDiameter}мм, ${maybePortLength}см`)
  }

  const maybeCar = head?.[1]?.[4]

  if (typeof maybeCar === 'string' && maybeCar.length > 0) {
    emptyMeasurementCase.meta.car = {
      label: maybeCar?.trim()
    }
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

  emptyMeasurementCase.id = [
    emptyMeasurementCase.meta.speaker?.label,
    emptyMeasurementCase.meta.cabinet?.volume,
    `${emptyMeasurementCase.meta.port?.diameter}_${emptyMeasurementCase.meta.port?.length}`,
    emptyMeasurementCase.meta.car?.label,
    emptyMeasurementCase.meta.isDoorOpened,
    emptyMeasurementCase.meta.voltageOfTesting,
    Math.random().toFixed(5)
  ]
    .join('_');

  return [emptyMeasurementCase as MeasurementCaseForGraph, errors] as const
}
