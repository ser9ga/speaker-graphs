'use client'

import {Grid, Text} from "@chakra-ui/react"
import * as React from "react";
import {Fragment} from "react";
import {EditableMeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {MeasuredValueField} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/modules/MeasuredValueField";
import {Control, FieldErrors, FieldValues} from "react-hook-form";
import {get} from "lodash";

type FrameSetProps <T extends FieldValues> = {
  control: Control<T, unknown, T>
  errors: FieldErrors<EditableMeasurementCaseFromCatalogue>
}

export function FrameSet <T extends FieldValues>({
  control,
  errors,
}: FrameSetProps<T>){
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
                            control={control}
                            framePath={`data.${key}`}
                          />
                          <MeasuredValueField
                            fieldName={`data.${key}.I`}
                            control={control}
                            framePath={`data.${key}`}
                          />
                          <MeasuredValueField
                            fieldName={`data.${key}.Pa`}
                            control={control}
                            framePath={`data.${key}`}
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
