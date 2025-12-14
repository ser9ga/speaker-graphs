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
  MEASUREMENT_CASE_TABLE_COLUMN_NAME
} from "@/app/_modules/Constants/MeasurementCaseTableColumnName";
import {MEASUREMENT_CASE_TABLE_COLUMN_LABEL} from "@/app/_modules/Constants/Translations/MeasurementCaseTableColumnLabel";
import {
  MeasurementCaseCollectionTableActionBar
} from "@/app/_modules/ViewComponents/MeasurementCaseCollectionTableActionBar/MeasurementCaseCollectionTableActionBar";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";


const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const columns = [
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID,
      width: 60,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL,
      path: 'meta.speaker.label',
      width: 300,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE,
      path: 'meta.speaker.coilResistance',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE,
      path: 'meta.cabinet.speakerSize',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME,
      path: 'meta.cabinet.volume',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER,
      path: 'meta.port.diameter',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH,
      path: 'meta.port.length',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL,
      path: 'meta.car.label',
      width: 200,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING,
      path: 'meta.voltageOfTesting',
      width: 150,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED,
      path: 'meta.isDoorOpened',
      width: 120,
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED],
      cellValue: (rawCell: MeasurementCaseFromCatalogue) => rawCell.meta.isDoorOpened
        ? "открыта"
        : "закрыта"
    },
    {
      keyName: MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION,
      path: 'meta.description',
      label: MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]
    },
]

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
