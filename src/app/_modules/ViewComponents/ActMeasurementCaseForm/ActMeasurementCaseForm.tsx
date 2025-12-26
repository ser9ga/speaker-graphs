'use client'

import {HStack} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import * as React from "react";
import {
  EditableMeasurementCaseFromCatalogue,
  MeasurementCaseFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {FrameSet} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/FrameSet";
import {FormMetaParams} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/FormMetaParams";

interface ActEntityFormProps {
  values: EditableMeasurementCaseFromCatalogue,
  onSave: (values: MeasurementCaseFromCatalogue) => void
  confirmText?: string
  confirmButtonLabel?: string
  onDeleteConfirmPopoverExit?: () => void,
}

export const ActMeasurementCaseForm = ({
  values,
  onSave,
  confirmText,
  confirmButtonLabel,
  onDeleteConfirmPopoverExit
}: ActEntityFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger
  } = useForm<EditableMeasurementCaseFromCatalogue>({values});

  const onSubmit = handleSubmit((data) => onSave(data as MeasurementCaseFromCatalogue))

  return (
    <form
      onSubmit={onSubmit}
      style={{height:'100%'}}
    >
      <HStack
        gap="100px"
        justifyContent={'center'}
        alignItems={'start'}
        height={'100%'}
      >
        <FormMetaParams
          control={control}
          handleSubmit={handleSubmit}
          trigger={trigger}
          onSave={onSave}
          confirmText={confirmText}
          confirmButtonLabel={confirmButtonLabel}
          onDeleteConfirmPopoverExit={onDeleteConfirmPopoverExit}
        />
        <FrameSet
          control={control}
          errors={errors}
        />
      </HStack>
    </form>
  )
}
