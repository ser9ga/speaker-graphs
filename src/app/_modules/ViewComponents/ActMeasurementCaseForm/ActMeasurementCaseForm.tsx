"use client"

import {Button, Grid, HStack, Stack, Text} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {
  CabinetFromCatalogue,
  CarFromCatalogue,
  MeasurementCaseFromCatalogue, PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {DoorOpenStateField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/DoorOpenStateField";
import {DescriptionField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/DescriptionField";
import {
  VoltageOfTestingField
} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/VoltageOfTestingField";
import {MeasuredValueField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/MeasuredValueField";
import {services} from "@/app/_modules/services";
import {SelectField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/SelectField";
import {
  MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseFormFieldNameLabel";
import {MEASUREMENT_CASE_ACT_FORM_FIELD_NAME} from "@/app/_modules/Constants/MeasurementCaseFormFieldName";

interface ActEntityFormProps {
  values: MeasurementCaseFromCatalogue,
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
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control
  } = useForm<MeasurementCaseFromCatalogue>({values});

  const onSubmit = handleSubmit((data) => {
    onSave(data)
  })

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
          {
            <>
              <SelectField
                collection={speakers}
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER]}
                control={control}
                getItemLabel={(item) => item.label}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.SPEAKER]}
              />
              <SelectField
                collection={cabinets}
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET]}
                control={control}
                getItemLabel={(item) => `${item.volume}л ${item.speakerSize}д`}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CABINET]}
              />
              <SelectField
                collection={ports}
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT]}
                control={control}
                getItemLabel={(item) => `${item.diameter}мм ${item.length}см`}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.PORT]}
              />
              <SelectField
                collection={cars}
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR}
                fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR]}
                control={control}
                getItemLabel={(item) => item.label}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.CAR]}
              />
              <DoorOpenStateField
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.IS_DOOR_OPENED}
                label={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.IS_DOOR_OPENED]}
                register={register}
                defaultValue={values.meta.isDoorOpened}
              />
              <VoltageOfTestingField
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING}
                label={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING]}
                register={register}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.VOLTAGE_OF_TESTING]}
              />
              <DescriptionField
                fieldName={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION}
                label={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION]}
                register={register}
                errorText={errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION]?.message}
                isError={!!errors[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DESCRIPTION]}
              />
            </>
          }
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
          <Button onClick={() => {console.log('values', getValues())}}>
            Получить данные
          </Button>
        </Stack>
        <Grid
          templateColumns={"repeat(4, 1fr)"}
          templateRows={"30px auto"}
          gap={'30px'}
        >
          {
            [...Array(4)]
              .map((_, columnIndex) => (
                <Grid
                  key={columnIndex}
                  templateColumns ={"repeat(4, 1fr)"}
                  templateRows={"repeat16, 1fr)"}
                  gap={'10px'}
                >
                  {
                    [
                      (
                        <Fragment key={'header'}>
                          <Text justifySelf={'center'}>Гц</Text>
                          <Text justifySelf={'center'}>В</Text>
                          <Text justifySelf={'center'}>А</Text>
                          <Text justifySelf={'center'}>дБ/м</Text>
                        </Fragment>
                      ),
                      [...Array(15)]
                        .map((_, rowIndex) => {
                          const frequency = columnIndex * 15 + rowIndex + 20
                          return (
                            <Fragment key={frequency}>
                              <Text
                                width={"35px"}
                                alignSelf={'center'}
                              >
                                {frequency}гц
                              </Text>
                              <MeasuredValueField
                                fieldName={`data[${frequency}].Uin`}
                                register={register}
                              />
                              <MeasuredValueField
                                fieldName={`data[${frequency}].I`}
                                register={register}
                              />
                              <MeasuredValueField
                                fieldName={`data[${frequency}].Pa`}
                                register={register}
                              />
                            </Fragment>
                          )}
                        )
                    ]
                  }
                </Grid>
              ))
          }
        </Grid>
      </HStack>
    </form>
  )
}
