"use client"

import * as React from "react";
import {Field, SegmentGroup} from "@chakra-ui/react"
import {UseFormRegister} from "react-hook-form";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

interface DoorOpenStateFieldProps {
  fieldName: string,
  label: string,
  register: UseFormRegister<MeasurementCaseFromCatalogue>,
  defaultValue: boolean,
}

export function DoorOpenStateField ({
  fieldName,
  label,
  register,
  defaultValue
}: DoorOpenStateFieldProps) {
  const inputProps = register(fieldName, {
    required: true
  });
  return (
    <Field.Root>
      <Field.Label paddingLeft={'5px'}>
        {label}
      </Field.Label>
        <SegmentGroup.Root
          defaultValue={defaultValue ? "true" : "false"}
          css={{
            "--segment-indicator-bg": "colors.teal.500",
            "--segment-indicator-shadow": "shadows.md",
          }}
          {...inputProps}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={[{value: "true", label: "Открыта"}, {value: "false", label: "Закрыта"}]} />
        </SegmentGroup.Root>
    </Field.Root>
  )
}
