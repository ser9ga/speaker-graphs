'use client'

import * as React from "react";
import {Field, Input, Textarea} from "@chakra-ui/react"
import {Control, Controller, FieldValues, Path} from "react-hook-form";

type DoorOpenStateFieldProps<T extends FieldValues, N extends Path<T>> = {
  fieldName: N,
  fieldLabel: string,
  control: Control<T, unknown, T>
  params?: {
    disabled?: boolean
    required?: boolean
    isTextarea?: boolean
  }
}

export function TextFormField <T extends FieldValues, N extends Path<T>>({
  fieldName,
  fieldLabel,
  control,
  params
}: DoorOpenStateFieldProps<T, N>) {
  const {
    disabled,
    required,
    isTextarea
  } = params || {}
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

  const Component = isTextarea
    ? Textarea
    : Input

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
        ...(required === true && {required})
      }}
      render={({
        field: {
         onChange,
         value
        },
        fieldState: {error},
      }) => (
        <Field.Root invalid={!!error}>
          <Field.Label {...(!!error && {color: 'red'})}>
            {fieldLabel}
          </Field.Label>
          <Component
            {...(disabled === true && {disabled})}
            value={getInputValue(value)}
            onChange={(e) => {
              onChange(getFormValue(e.target.value))
            }}
          />
        </Field.Root>
      )}
    />
  )
}
