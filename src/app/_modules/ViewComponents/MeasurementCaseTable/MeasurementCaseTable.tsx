'use client'

import {Flex, HStack, Table, Text} from '@chakra-ui/react';
import {get} from 'lodash';
import * as React from "react";
import {useEffect, useState} from "react";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {services} from "@/app/_modules/services";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {OverlayLoader} from "@/app/_modules/ViewComponents/OverlayLoader/OverlayLoader";
import {
  MeasurementCaseCollectionTableActionBar
} from "@/app/_modules/ViewComponents/MeasurementCaseCollectionTableActionBar/MeasurementCaseCollectionTableActionBar";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {generateEmptyMeasurementCase} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {columns} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";

export const MeasurementCaseTable = () => {
  const [measurementCases, setMeasurementCases] = useState<MeasurementCaseFromCatalogue[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const measurementCaseService = services.measurementCases

  const getMeasurementCases = async () => {
    setIsLoading(true);
    const res = await measurementCaseService.getAll();

    if (res?.isError) {
      return;
    }

    setMeasurementCases(res)
    setIsLoading(false);
  };

  useEffect(() => {
    getMeasurementCases()
  }, []);

  const getDialogFullName = (id: number | 'new') => `measurementCase_${id}`

  const onEntityAdd = async (values: MeasurementCaseFromCatalogue) => {
    const res = await measurementCaseService.add(values);

    if (res?.isError) {
      return;
    }

    await commonDialog.close(getDialogFullName('new'))

    await getMeasurementCases()
  }

  const onEntityEdit = async (values: MeasurementCaseFromCatalogue, id: number) => {
    const res = await measurementCaseService.update(values);

    if (res?.isError) {
      return;
    }

    await commonDialog.close(getDialogFullName(id))

    await getMeasurementCases()
  }

  const onEntityDelete = async (id: number) => {
    const res = await measurementCaseService.remove(id);

    if (res?.isError) {
      return;
    }

    await getMeasurementCases()
  }

  return (
    <OverlayLoader isLoading={isLoading}>
      <Flex
        justifyContent={'start'}
        alignItems={'end'}
        direction={'column'}
        gap={'10px'}
      >
        <MeasurementCaseCollectionTableActionBar
          onAddClick={() => {
            commonDialog.open(getDialogFullName('new'), {
              title: 'Создание нового случая изменрения',
              content: (
                <ActMeasurementCaseForm
                  values={generateEmptyMeasurementCase()}
                  onSave={(values) => onEntityAdd(values)}
                  columns={columns}
                  confirmText={'Подтвердить создание?'}
                  confirmButtonLabel={'Подтвердить'}
                />
              ),
              size: "cover"
            })
          }}
        />
        <Table.Root
          width="100%"
          interactive
        >
          <Table.Header>
            <Table.Row>
              {columns.map((column) => {
                return (
                  <Table.ColumnHeader
                    key={column.keyName}
                    {...(column.width && {width: `${column.width}px`})}
                  >
                    {column.label}
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {measurementCases.map((item) => {
              return (
                <Table.Row key={item.id}>
                  {columns.map((column) => {
                    const getCellContent = (child: React.ReactNode) => {
                      if (column.keyName === 'id') {
                        return (
                          <HStack gap={0}>
                            {child}
                            <EntityActionTableCell
                              onEditClick={(exitCallback) => {

                                commonDialog.open(getDialogFullName(item.id), {
                                  title: `Редактирование случая измерения`,
                                  content: (
                                    <ActMeasurementCaseForm
                                      values={item}
                                      onSave={(values) => onEntityEdit(values, item.id)}
                                      columns={columns}
                                      onDeleteConfirmPopoverExit={exitCallback}
                                      confirmText={'Подтвердить создание?'}
                                      confirmButtonLabel={'Подтвердить'}
                                    />
                                  ),
                                  exitCallback,
                                  size: "cover"
                                })
                              }}
                              onEntityDelete={() => onEntityDelete(item.id)}
                            />
                          </HStack>
                        )
                      }

                      return child
                    }

                    const cellValue = column.cellValue?.(item);

                    const cellText = cellValue
                    || get(item, column?.path)
                    || get(item, column.keyName)

                    return (
                      <Table.Cell
                        key={column.keyName}
                        {...(column.width && {width: `${column.width}px`})}
                      >
                        {getCellContent(
                          <Text
                            {...(column.width && {width: `${column.width - 30}px`})}
                            textStyle="sm"
                            truncate
                          >
                            {cellText}
                          </Text>
                        )}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Flex>
    </OverlayLoader>
  )
}
