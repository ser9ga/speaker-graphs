'use client'

import {Box, Grid, ScrollArea, Text} from "@chakra-ui/react"
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

  const getCellContent = (cellText: string) => {
    return (
      <Box
        height={'100%'}
        width={'100%'}
        justifySelf={'center'}
        position={'sticky'}
        top={'0px'}
        left={'0px'}
        zIndex={'1'}
        backgroundColor={'white'}
        css={{
          "&": {
            _after: {
              content: '""',
              position: "absolute",
              zIndex: '-1',
              top: "-10px",
              left: "-5px",
              width: "80px",
              height: "40px",
              backgroundColor: 'white',
            },
          },
        }}
      >
        <Text
          justifySelf={'center'}
          position={'relative'}
        >
          {cellText}
        </Text>
      </Box>
    )
  }

  return (
    <ScrollArea.Root width={'unset'}>
      <ScrollArea.Viewport>
        <ScrollArea.Content paddingEnd="5">
          <Grid
            templateColumns ={"repeat(4, 1fr)"}
            templateRows={"repeat16, 1fr)"}
            gap={'10px'}
          >
            {
              [
                (
                  <Fragment key={'header'}>
                    {getCellContent('Гц')}
                    {getCellContent('В')}
                    {getCellContent('А')}
                    {getCellContent('дБ/м')}
                  </Fragment>
                ),
                [...Array(51)]
                  .map((_, rowIndex) => {
                    const frequency = rowIndex + 20
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
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
