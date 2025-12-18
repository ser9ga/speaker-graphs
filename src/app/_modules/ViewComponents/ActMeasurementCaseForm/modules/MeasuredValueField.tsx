'use client'

import * as React from "react";
import {Field, NumberInput} from "@chakra-ui/react"
import {Control, Controller, FieldPath, TriggerConfig} from "react-hook-form";
import {EditableMeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {get, isNaN} from "lodash";
import {getIsFrameEmptyAndValid, getIsFrameFilledAndValid} from "@/app/_modules/Utils/measurementCaseFormUtils";

interface DoorOpenStateFieldProps {
  fieldName: string,
  fieldLabel: string,
  control: Control<
    EditableMeasurementCaseFromCatalogue,
    unknown,
    EditableMeasurementCaseFromCatalogue
  >
  framePath: string
  trigger: (
    name?: (
      | FieldPath<EditableMeasurementCaseFromCatalogue>
      | FieldPath<EditableMeasurementCaseFromCatalogue>[]
      ),
    options?: TriggerConfig
  ) => Promise<boolean>
}

export const MeasuredValueField = ({
  fieldName,
  control,
  framePath,
}: DoorOpenStateFieldProps) => {
  const getIsConsistentDataSet = async (_, formValues: EditableMeasurementCaseFromCatalogue) => {
    const frame = get(formValues, framePath)

    const isFrameFilledAndValid = getIsFrameFilledAndValid(frame)
    const isFrameEmptyAndValid = getIsFrameEmptyAndValid(frame)

    return isFrameFilledAndValid || isFrameEmptyAndValid
  }

  const getInputValue = (formValue: number | null) => {
    if (isNaN(formValue) || formValue === null) {
      return ''
    }

    return String(formValue)
  }

  const getFormValue = (inputValue: number) => {
    if (Number.isNaN(inputValue)) {
      return undefined
    }

    return Number(inputValue)
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
        validate: {
          isConsistentDataSet: getIsConsistentDataSet,
        },
      }}
      render={({
        field: {
          onChange,
          value
        },
        fieldState: {error}
      }) => (
        <Field.Root invalid={!!error}>
          <NumberInput.Root
            width={'70px'}
            value={getInputValue(value)}
            onValueChange={(e) => onChange(getFormValue(e.valueAsNumber))}
          >
            <NumberInput.Input/>
          </NumberInput.Root>
        </Field.Root>
      )}
    />
  )
}
