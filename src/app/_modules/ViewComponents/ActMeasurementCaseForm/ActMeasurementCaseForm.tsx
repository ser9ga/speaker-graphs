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
import {toaster} from "@/app/_modules/components/ui/toaster";
import {parseMeasuringCaseFromCatalogToCSV} from "@/app/_modules/Utils/parseMeasuringCaseFromCatalogToCSV";
import {getExportedCSVFileName} from "@/app/_modules/Utils/getExportedCSVFileName";

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
    trigger,
    getValues
  } = useForm<EditableMeasurementCaseFromCatalogue>({values});

  const onSubmit = handleSubmit((data) => onSave(data as MeasurementCaseFromCatalogue))

  const onExport  = async () => {
    const flag = await trigger()

    if (flag) {
      const values = getValues();

      toaster.create({
        title: 'Экспорт завершен',
        type: "success",
      })

      const result = parseMeasuringCaseFromCatalogToCSV(values as MeasurementCaseFromCatalogue)

      return new Blob([`\ufeff${result}`], {
        type: 'text/csv;charset=utf-8'
      })
    } else {
      toaster.create({
        title: 'Экспорт не выполнен',
        description: 'Некорректные значения в форме',
        type: "error",
      })
    }
  }

  const getFileName = () => getExportedCSVFileName(getValues() as MeasurementCaseFromCatalogue)

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
          // @ts-ignore
          onExport={onExport}
          getFileName={getFileName}
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
