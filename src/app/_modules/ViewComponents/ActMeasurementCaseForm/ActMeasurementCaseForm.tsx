"use client"

import {Button, HStack, Stack} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import * as React from "react";
import {useEffect, useState} from "react";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {
  CabinetFromCatalogue,
  CarFromCatalogue,
  EmptyMeasurementCaseFromCatalogue,
  MeasurementCaseFromCatalogue,
  PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {DoorOpenStateField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/DoorOpenStateField";
import {
  VoltageOfTestingField
} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/VoltageOfTestingField";
import {services} from "@/app/_modules/services";
import {SelectField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/SelectField";
import {
  MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseFormFieldNameLabel";
import {MEASUREMENT_CASE_ACT_FORM_FIELD_NAME} from "@/app/_modules/Constants/MeasurementCaseFormFieldName";
import {DescriptionField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/DescriptionField";
import {FrameSet} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/FrameSet";

interface ActEntityFormProps {
  values: MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue,
  onSave: (values: MeasurementCaseFromCatalogue) => void
  columns: {
    keyName: string
    label: string
  }[],
  confirmText?: string
  confirmButtonLabel?: string
  onDeleteConfirmPopoverExit?: () => void,
}

export function ActMeasurementCaseForm ({
  values,
  onSave,
  confirmText,
  confirmButtonLabel,
  onDeleteConfirmPopoverExit
}: ActEntityFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger
  } = useForm<MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue>({values});

  const onSubmit = handleSubmit((data) => onSave(data as MeasurementCaseFromCatalogue))

  const [speakers, setSpeakers] = useState<SpeakerFromCatalogue[]>([])
  const [cabinets, setCabinets] = useState<CabinetFromCatalogue[]>([])
  const [ports, setPorts] = useState<PortFromCatalogue[]>([])
  const [cars, setCars] = useState<CarFromCatalogue[]>([])

  useEffect(() => {
    (async () => {
      const speakersRes = await services.speakers.getAll()
      const cabinetsRes = await services.cabinets.getAll()
      const portsRes = await services.ports.getAll()
      const carsRes = await services.cars.getAll()

      setSpeakers(speakersRes)
      setCabinets(cabinetsRes)
      setPorts(portsRes)
      setCars(carsRes)
    })()
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <HStack gap="100px"
        justifyContent={'center'}
        alignItems={'start'}
      >
        <Stack
          flex-srink
          gap="4"
          align="flex-start"
          width={'400px'}
        >
          <SelectField
            collection={speakers}
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER]}
            control={control}
            getItemLabel={(item) => item.label}
          />
          <SelectField
            collection={cabinets}
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET]}
            control={control}
            getItemLabel={(item) => `${item.volume}л ${item.speakerSize}д`}
          />
          <SelectField
            collection={ports}
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT]}
            control={control}
            getItemLabel={(item) => `${item.diameter}мм ${item.length}см`}
          />
          <SelectField
            collection={cars}
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR]}
            control={control}
            getItemLabel={(item) => item.label}
          />
          <DoorOpenStateField
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.IS_DOOR_OPENED}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.IS_DOOR_OPENED]}
            control={control}
          />
          <VoltageOfTestingField
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING]}
            control={control}
          />
          <DescriptionField
            fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION}
            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION]}
            control={control}
          />
          <ConfirmActionPopover
            header={confirmText ||'Сохранить?'}
            onConfirm={onSubmit}
            onExitComplete={onDeleteConfirmPopoverExit}
            confirmButtonLabel={confirmButtonLabel || 'Сохранить'}
          >
            <Button alignSelf={'end'}>
              {'Сохранить'}
            </Button>
          </ConfirmActionPopover>
          <Button>
            Получить данные
          </Button>
        </Stack>
        <FrameSet
          control={control}
          errors={errors}
          trigger={trigger}
        />
      </HStack>
    </form>
  )
}
