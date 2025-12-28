'use client'

import {Button, DownloadTrigger, HStack, ScrollArea, Stack, Text} from "@chakra-ui/react"
import * as React from "react";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {
  EditableMeasurementCaseFromCatalogue,
  MeasurementCaseFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {DoorOpenStateField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/DoorOpenStateField";
import {SelectField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/SelectField";
import {
  MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseFormFieldNameLabel";
import {MEASUREMENT_CASE_ACT_FORM_FIELD_NAME} from "@/app/_modules/Constants/MeasurementCaseFormFieldName";
import {NumericalFormField} from "@/app/_modules/ViewComponents/NumericalFormField/NumericalFormField";
import {TextFormField} from "@/app/_modules/ViewComponents/TextFormField/TextFormField";
import {Control, FieldPath, TriggerConfig, UseFormHandleSubmit} from "react-hook-form";
import {useGetAllSpeakersQuery} from "@/app/_modules/Store/Api/SpeakersApi";
import {useGetAllCabinetsQuery} from "@/app/_modules/Store/Api/CabinetsApi";
import {useGetAllPortsQuery} from "@/app/_modules/Store/Api/PortsApi";
import {useGetAllCarsQuery} from "@/app/_modules/Store/Api/CarsApi";
import {SpinnerWrapper} from "@/app/_modules/ViewComponents/SpinnerWrapper/SpinnerWrapper";

interface ActEntityFormProps {
  control: Control<EditableMeasurementCaseFromCatalogue, unknown, EditableMeasurementCaseFromCatalogue>,
  handleSubmit: UseFormHandleSubmit<EditableMeasurementCaseFromCatalogue, EditableMeasurementCaseFromCatalogue>,
  trigger: (name?: (FieldPath<EditableMeasurementCaseFromCatalogue> | FieldPath<EditableMeasurementCaseFromCatalogue>[]), options?: TriggerConfig) => Promise<boolean>
  onSave: (values: MeasurementCaseFromCatalogue) => void
  onExport: () => Promise<string>,
  getFileName: () => string,
  confirmText?: string
  confirmButtonLabel?: string
  onDeleteConfirmPopoverExit?: () => void,
}

const FormMetaParams = ({
  control,
  handleSubmit,
  trigger,
  onSave,
  onExport,
  getFileName,
  confirmText,
  confirmButtonLabel,
  onDeleteConfirmPopoverExit
}: ActEntityFormProps) => {
  const onSubmit = handleSubmit((data) => onSave(data as MeasurementCaseFromCatalogue))

  const {data: speakers, isLoading: isSpeakersLoading} = useGetAllSpeakersQuery();
  const {data: cabinets, isLoading: isCabinetsLoading} = useGetAllCabinetsQuery();
  const {data: ports, isLoading: isPortsLoading} = useGetAllPortsQuery();
  const {data: cars, isLoading: isCarsLoading} = useGetAllCarsQuery();

  if (
    !speakers
    || !cabinets
    || !ports
    || !cars
  ) {
    return (
      <Text>
        Проблема с загрузкой реестров
      </Text>
    )
  }

  const loadingPredicate = isSpeakersLoading
  || isCabinetsLoading
  || isPortsLoading
  || isCarsLoading

  return (
    <SpinnerWrapper isSpinning={loadingPredicate}>
      <ScrollArea.Root width={'unset'}>
        <ScrollArea.Viewport>
          <ScrollArea.Content paddingEnd="5">
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
              <NumericalFormField
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING]}
                control={control}
                params={{
                  suffix: 'В',
                  width: '100px',
                  min: 0,
                  max: 99,
                  required: true
                }}
              />
              <TextFormField
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION]}
                control={control}
                params={{
                  isTextarea: true,
                }}
              />
              <HStack>
                <ConfirmActionPopover
                  header={confirmText ||'Сохранить?'}
                  onConfirm={onSubmit}
                  onExitComplete={onDeleteConfirmPopoverExit}
                  confirmButtonLabel={confirmButtonLabel || 'Сохранить'}
                  beforePopover={trigger}
                >
                  <Button alignSelf={'end'}>
                    Сохранить
                  </Button>
                </ConfirmActionPopover>
                <DownloadTrigger
                  data={onExport}
                  fileName={getFileName()}
                  mimeType="text/csv"
                  asChild
                >
                  <Button
                    alignSelf={'end'}
                    variant={'outline'}
                  >
                    Экспортировать
                  </Button>
                </DownloadTrigger>
              </HStack>
            </Stack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </SpinnerWrapper>
  )
}
export default FormMetaParams
