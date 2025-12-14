"use client"

import * as React from "react";
import {Field, NumberInput} from "@chakra-ui/react"
import {UseFormRegister} from "react-hook-form";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {isNumber} from "lodash";

interface DoorOpenStateFieldProps {
  fieldName: string,
  label: string,
  register: UseFormRegister<MeasurementCaseFromCatalogue>,
  errorText: string,
  isError: boolean,
}

export function MeasuredValueField ({
  fieldName,
  label,
  register,
  errorText,
  isError
}: DoorOpenStateFieldProps) {
  const qwe = register(fieldName, {
    required: true,
  });

  return (
    <Field.Root
      invalid={isError}
      display={'block'}
    >
      <Field.Label>
        {label}
      </Field.Label>
      <NumberInput.Root width={'70px'}>
        <NumberInput.Input
          {...qwe}
        />
      </NumberInput.Root>
      <Field.ErrorText>
        {errorText}
      </Field.ErrorText>
    </Field.Root>
  )
}
