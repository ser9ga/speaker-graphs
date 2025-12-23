'use client'

import * as React from "react";
import {Control, FieldValues, Path} from "react-hook-form";
import {EditableMeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {get} from "lodash";
import {getIsFrameEmptyAndValid, getIsFrameFilledAndValid} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {NumericalFormField} from "@/app/_modules/ViewComponents/NumericalFormField/NumericalFormField";

type DoorOpenStateFieldProps<T extends FieldValues> = {
  fieldName: string
  control: Control<T, unknown, T>
  framePath: string
}

export function MeasuredValueField <T extends FieldValues, N extends Path<T>>({
  fieldName,
  control,
  framePath,
}: DoorOpenStateFieldProps<T>){
  const getIsConsistentDataSet = async (_: unknown, formValues: EditableMeasurementCaseFromCatalogue) => {
    const frame = get(formValues, framePath);

    return getIsFrameFilledAndValid(frame) || getIsFrameEmptyAndValid(frame)
  }

  return (
    <NumericalFormField
      fieldName={fieldName as N}
      control={control}
      params={{
        width: '70px',
        validate: {
          isConsistentDataSet: getIsConsistentDataSet,
        },
      }}
    />
  )
}
