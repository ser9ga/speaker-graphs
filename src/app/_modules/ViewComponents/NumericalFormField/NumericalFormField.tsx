'use client'

import * as React from "react";
import {FC, FocusEventHandler, useState} from "react";
import {Field, HStack, Input} from "@chakra-ui/react"
import {Control, Controller, FieldValues, Path} from "react-hook-form";

type NumericalFormFieldProps<T extends FieldValues, N extends Path<T>> = {
  fieldName: N,
  fieldLabel?: string,
  control: Control<T, unknown, T>
  params?: {
    disabled?: boolean
    suffix?: string
    width?: string | number
    min?: number
    max?: number
    required?: boolean
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    validate?: Record<string, Function> // TODO
  }
}

type adf = {
  value: number | null,
  onChange: (value: number | null) => void,
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const ControlledNumberInput: FC<adf> = ({
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [val,setVal] = useState(String(value || '').replace('.', ','));

  const parsFromInputToState = (inputValue: string) => {
    if (inputValue === '') {
      return inputValue
    }

    const match = inputValue.match(/^(?:0|[1-9]\d*)(?:,\d{0,2})?$/);

    if (!match) {
      return val;
    }

    return inputValue;
  };

  const parseFromInputToExternal = (inputValue: string) => {
    if (inputValue === '') {
      return null
    }

    return Number(inputValue.replace(/,\s*$/, '').replace(',', '.'))
  };

  return (
    <Input
      {...rest}
      onBlur={(...args) => {
        onBlur?.(...args)
        setVal(p => p.replace(/,\s*$/, ''))
      }}
      value={val}
      onChange={(e) => {
        const newValue = e.target.value;
        const newVal = parsFromInputToState(newValue)
        setVal(newVal);
        onChange(parseFromInputToExternal(newVal));
      }}
    />
  )
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
    validate
  } = params || {};
  return (
    <Controller
      control={control}
      name={fieldName}
      // @ts-ignore
      rules={{
      ...(required === true && {required}),
      ...(typeof validate === 'object' && {validate})
      }}
      render={({
        field: {
          onChange,
          value
        },
         fieldState: {error}
      }) => (
        <Field.Root invalid={!!error}>
          {!!fieldLabel && (
            <Field.Label {...(!!error && {color: 'red'})}>
              {fieldLabel}
            </Field.Label>
          )}
          <HStack>
            <ControlledNumberInput
              value={value}
              onChange={onChange}
              {...((typeof width === 'number'
                  || typeof width === 'string')
                && {width})}
              {...(disabled === true && {disabled})}
              {...(typeof min === 'number' && {min})}
              {...(typeof max === 'number' && {max})}
            />
            {suffix}
          </HStack>
        </Field.Root>
      )}
    />
  )
}
