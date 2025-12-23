'use client'

import * as React from "react";
import {Field, SegmentGroup} from "@chakra-ui/react"
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {DOOR_STATE_NAME, DoorStateName} from "@/app/_modules/Constants";
import {DOOR_STATE_LABEL} from "@/app/_modules/Constants/Translations/DoorStateLabel";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";

type DoorOpenStateFieldProps<T extends FieldValues, N extends Path<T>> = {
  fieldName: N,
  fieldLabel: string,
  control: Control<T, unknown, T>
}

const values = [
  {value: DOOR_STATE_NAME.OPENED, label: DOOR_STATE_LABEL[DOOR_STATE_NAME.OPENED]},
  {value: DOOR_STATE_NAME.CLOSED, label: DOOR_STATE_LABEL[DOOR_STATE_NAME.CLOSED]}
]

export function DoorOpenStateField <T extends FieldValues, N extends Path<T>>({
  fieldName,
  fieldLabel,
  control,
}: DoorOpenStateFieldProps<T, N>){
  const getSegmentValue = (segmentValue: boolean | null) => {
    switch (segmentValue) {
      case null: return undefined;
      case true: return DOOR_STATE_NAME.OPENED;
      case false: return DOOR_STATE_NAME.CLOSED;

      default: _exhaustiveCheck(segmentValue, {fallBack: ''});
    }
  }

  const getFormValue = (formValue: DoorStateName) => {
    switch (formValue) {
      case DOOR_STATE_NAME.OPENED: return true;
      case DOOR_STATE_NAME.CLOSED: return false;

      default: _exhaustiveCheck(formValue, {fallBack: null});
    }
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
        validate: {
          isFilled: (value) => typeof value === 'boolean'
        },
      }}
      render={({
        field: {
          onChange,
          value
        },
        fieldState: {error}
      }) => {
        return (
          <Field.Root invalid={!!error}>
            <Field.Label {...(!!error && {color: 'red'})}>
              {fieldLabel}
            </Field.Label>
            <SegmentGroup.Root
              value={getSegmentValue(value)}
              onValueChange={(e) => onChange(getFormValue(e.value as DoorStateName))}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={values} />
            </SegmentGroup.Root>
          </Field.Root>
        )
      }}
    />
  )
}
