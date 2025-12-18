'use client'

import * as React from "react";
import {Field, Textarea} from "@chakra-ui/react"
import {Control, Controller} from "react-hook-form";
import {EditableMeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

interface DoorOpenStateFieldProps {
  fieldName: 'meta.description',
  fieldLabel: string,
  control: Control<
    EditableMeasurementCaseFromCatalogue,
    unknown,
    EditableMeasurementCaseFromCatalogue
  >
}

export function DescriptionField ({
  fieldName,
  fieldLabel,
  control,
}: DoorOpenStateFieldProps) {
  const getInputValue = (formValue: string | null) => {
    if (formValue === null) {
      return ''
    }

    return formValue
  }

  const getFormValue = (inputValue: string) => {
    if (inputValue === '') {
      return null
    }
    return inputValue
  }

  return (
    <Controller
      control={control}
      name={fieldName}
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
          <Textarea
            value={getInputValue(value)}
            onChange={(e) => {
              onChange(getFormValue(e.target.value))
            }}
          />
        </Field.Root>
        )
      }
    />
  )
}
