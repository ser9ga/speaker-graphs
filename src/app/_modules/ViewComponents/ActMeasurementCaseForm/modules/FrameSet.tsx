"use client"

import {Grid, Text} from "@chakra-ui/react"
import * as React from "react";
import {Fragment} from "react";
import {EmptyMeasurementCaseFromCatalogue, MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {
  MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseFormFieldNameLabel";
import {MEASUREMENT_CASE_ACT_FORM_FIELD_NAME} from "@/app/_modules/Constants/MeasurementCaseFormFieldName";
import {MeasuredValueField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/MeasuredValueField";
import {Control, FieldErrors, FieldPath, TriggerConfig} from "react-hook-form";
import {get} from "lodash";

interface ActEntityFormProps {
  control: Control<
    MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue,
    unknown,
    MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue
  >
  errors: FieldErrors<MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue>
  trigger: (
    name?: (
      | FieldPath<MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue>
      | FieldPath<MeasurementCaseFromCatalogue | EmptyMeasurementCaseFromCatalogue>[]
    ),
    options?: TriggerConfig
  ) => Promise<boolean>
}

export const FrameSet = ({
  control,
  errors,
  trigger
}: ActEntityFormProps) => {
  const getIsErrors = (key: number) => {
    return !!get(errors, `data.${key}`)
  }

  return (
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
                      const key = frequency

                      if (frequency > 70) {
                        return null
                      }

                      return (
                        <Fragment key={frequency}>
                          <Text
                            width={"35px"}
                            alignSelf={'center'}
                            {...(getIsErrors(frequency) && {color: 'red'})}
                          >
                            {frequency}гц
                          </Text>
                          <MeasuredValueField
                            fieldName={`data.${key}.Uin`}
                            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DATA]}
                            control={control}
                            framePath={`data.${key}`}
                            trigger={trigger}
                          />
                          <MeasuredValueField
                            fieldName={`data.${key}.I`}
                            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DATA]}
                            control={control}
                            framePath={`data.${key}`}
                            trigger={trigger}
                          />
                          <MeasuredValueField
                            fieldName={`data.${key}.Pa`}
                            fieldLabel={MEASUREMENT_CASE_ACT_FORM_FIELD_NAME_LABEL[MEASUREMENT_CASE_ACT_FORM_FIELD_NAME.DATA]}
                            control={control}
                            framePath={`data.${key}`}
                            trigger={trigger}
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
  )
}
