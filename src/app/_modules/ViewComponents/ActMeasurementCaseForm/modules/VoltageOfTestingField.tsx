"use client"

import * as React from "react";
import {Field, HStack, NumberInput} from "@chakra-ui/react"
import {UseFormRegister} from "react-hook-form";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

interface DoorOpenStateFieldProps {
  fieldName: string,
  label: string,
  register: UseFormRegister<MeasurementCaseFromCatalogue>,
  errorText: string,
  isError: boolean,
}

export function VoltageOfTestingField ({
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
    <Field.Root invalid={isError}>
      <Field.Label paddingLeft={'5px'}>
        {label}
      </Field.Label>
        <NumberInput.Root
          min={0}
          max={99}
        >
          <HStack>
            <NumberInput.Input
              width={'50px'}
              {...inputProps}
            />
            Вольт
          </HStack>
        </NumberInput.Root>
      <Field.ErrorText>
        {errorText}
      </Field.ErrorText>
    </Field.Root>
  )
}
