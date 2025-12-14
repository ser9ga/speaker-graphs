"use client"

import * as React from "react";
import {Field, Textarea} from "@chakra-ui/react"
import {UseFormRegister} from "react-hook-form";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

interface DoorOpenStateFieldProps {
  fieldName: string,
  label: string,
  register: UseFormRegister<MeasurementCaseFromCatalogue>,
  errorText: string,
  isError: boolean,
}

export function DescriptionField ({
  fieldName,
  label,
  register,
  errorText,
  isError
}: DoorOpenStateFieldProps) {
  const inputProps = register(fieldName, {
    required: true,
  });

  return (
    <Field.Root
      invalid={isError}
      width={'100%'}
    >
      <Field.Label paddingLeft={'5px'}>
        {label}
      </Field.Label>
        <Textarea
          {...inputProps}
        />
      <Field.ErrorText>
        {errorText}
      </Field.ErrorText>
    </Field.Root>
  )
}
