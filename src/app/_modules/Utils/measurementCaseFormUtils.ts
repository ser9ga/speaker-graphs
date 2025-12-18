'use client'

import {EmptyMeasurementCaseFromCatalogue, MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {MEASURED_UNIT} from "@/app/_modules/Constants";
import {isEqual, isNumber, isNaN} from "lodash";

const validateEntity = (
  entity: unknown,
  {
    validType,
    isCreating,
    isRequired,
  }: {
    validType: 'object' | 'string' | 'boolean' | 'number',
    isCreating: boolean
    isRequired: boolean
  }
) => {
  if (entity === null) {
    if (isCreating) {
      return true
    }

    if (!isRequired) {
      return true
    }

    return false
  }

  if (typeof entity === validType) {
    return true;
  }

  return false;
}

const getIsFrameValid = (frame: unknown, validateCallback: (arg: unknown) => boolean) => {
  if (typeof frame !== 'object' || frame === null) {
    return false;
  }

  const referenceUnitNames = Object.values(MEASURED_UNIT).sort()
  const unitNames = Object.keys(frame).sort()

  if (!isEqual(referenceUnitNames, unitNames)) {
    return false;
  }

  if (!Object.values(frame).every(validateCallback)) {
    return false;
  }

  return true;
}

export const getIsFrameFilledAndValid = (frame: unknown) => getIsFrameValid(
  frame,
  (value) =>  isNumber(value) && !isNaN()
);

export const getIsFrameEmptyAndValid = (frame: unknown) => getIsFrameValid(
  frame,
  (value) => value === null
);

// TODO не знаю, нужно или нет
export const validateMeasurementCase = (
  measurementCase: Partial<MeasurementCaseFromCatalogue>,
  {isCreating = false}: { isCreating?: boolean }
) => {
  const validationErrors = [];

  validateEntity(
    measurementCase.meta?.speaker,
    {
      validType: 'object',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Динамик"')

  validateEntity(
    measurementCase.meta?.cabinet,
    {
      validType: 'object',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Короб"')

  validateEntity(
    measurementCase.meta?.port,
    {
      validType: 'object',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Порт"')

  validateEntity(
    measurementCase.meta?.car,
    {
      validType: 'object',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Автомобиль"')

  validateEntity(
    measurementCase.meta?.isDoorOpened,
    {
      validType: 'boolean',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Дверь"')

  validateEntity(
    measurementCase.meta?.voltageOfTesting,
    {
      validType: 'number',
      isCreating,
      isRequired: true
    }
  ) && validationErrors.push('Некорректные данные в поле "Напряжение тестирования"')

  validateEntity(
    measurementCase.meta?.description,
    {
      validType: 'string',
      isCreating,
      isRequired: false
    }
  ) && validationErrors.push('Некорректные данные в поле "Описание"')

  const buffData = {...measurementCase?.data}

  for (let i = 20; i <= 70; i ++) {
    const frame = buffData[i]

    const isFrameFilledAndValid = getIsFrameFilledAndValid(frame)
    const isFrameEmptyAndValid = getIsFrameEmptyAndValid(frame)

    if (!isFrameFilledAndValid || !isFrameEmptyAndValid) {
      validationErrors.push('Некорректные данные в поле "Данные"')
      break
    }

    delete buffData[i]
  }

  if (Object.entries(buffData).length) {
    validationErrors.push('Некорректные данные в поле "Данные"')
  }

  return validationErrors
}

export const generateEmptyMeasurementCase = () => {
  const emptyMeasurementCase: EmptyMeasurementCaseFromCatalogue =  {
    meta: {
      speaker: null,
      cabinet: null,
      port: null,
      car: null,
      isDoorOpened: null,
      voltageOfTesting: null,
      description: null,
    },
    data: [...Array(51)]
      .reduce((acc, __, index) => {
        return {
          ...acc,
          [index + 20]: {
            Uin: null,
            I: null,
            Pa: null,
          }
        }
      }, {})
  }

  return emptyMeasurementCase
}
