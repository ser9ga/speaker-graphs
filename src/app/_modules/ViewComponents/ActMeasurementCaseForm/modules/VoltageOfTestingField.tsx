"use client"

import * as React from "react";
import {Field, HStack, NumberInput} from "@chakra-ui/react"
import {Control, Controller} from "react-hook-form";
import {EmptyMeasurementCaseFromCatalogue, MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {isNaN} from "lodash";

interface DoorOpenStateFieldProps {
  fieldName: 'meta.voltageOfTesting',
  fieldLabel: string,
  control: Control<
    MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue,
    unknown,
    MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue
  >
}

export function VoltageOfTestingField ({
  fieldName,
  fieldLabel,
  control
}: DoorOpenStateFieldProps) {
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
        required: true,
      }}
      render={({
        field: {
          onChange,
          value
        },
         fieldState: {error}
      }) => (
        <Field.Root invalid={!!error}>
          <Field.Label {...(!!error && {color: 'red'})}>
            {fieldLabel}
          </Field.Label>
          <NumberInput.Root
            min={0}
            max={99}
            value={getInputValue(value)}
            onValueChange={(e) => onChange(getFormValue(e.valueAsNumber))}
          >
            <HStack>
              <NumberInput.Input width={'50px'}/>
              Вольт
            </HStack>
          </NumberInput.Root>
        </Field.Root>
        )
      }
    />
  )
}
