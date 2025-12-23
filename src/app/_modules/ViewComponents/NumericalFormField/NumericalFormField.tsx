'use client'

import * as React from "react";
import {Field, HStack, NumberInput} from "@chakra-ui/react"
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {isNaN} from "lodash";

type NumericalFormFieldProps<T extends FieldValues, N extends Path<T>> = {
  fieldName: N,
  fieldLabel: string,
  control: Control<T, unknown, T>
  params?: {
    disabled?: boolean
    suffix?: string
    width?: string | number
    min?: number
    max?: number
    required?: boolean
  }
}

export function NumericalFormField <T extends FieldValues, N extends Path<T>>({
  fieldName,
  fieldLabel,
  control,
  params
}: NumericalFormFieldProps<T, N>) {
  const {
    disabled,
    suffix,
    width,
    min,
    max,
    required,
  } = params || {};

  const getInputValue = (formValue: number | null) => {
    if (isNaN(formValue) || formValue === null) {
      return ''
    }

    return String(formValue)
  }

  const getFormValue = (inputValue: string) => {
    if (inputValue === '') {
      return null
    }

    return Number(inputValue)
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
      ...(typeof required === 'boolean' && {required})
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
            {...(typeof disabled === 'boolean' && {disabled})}
            {...(typeof min === 'number' && {min})}
            {...(typeof max === 'number' && {max})}
            value={getInputValue(value)}
            onValueChange={(e) => {
              onChange(getFormValue(e.value))}
            }
          >
            <HStack>
              <NumberInput.Input
                {...((typeof width === 'number'
                  || typeof width === 'string')
                  && {width})}
              />
              {typeof suffix === 'string' && suffix}
            </HStack>
          </NumberInput.Root>
        </Field.Root>
      )}
    />
  )
}
