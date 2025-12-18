'use client'

import {HStack, Table, Text} from '@chakra-ui/react';
import {get} from 'lodash';
import * as React from "react";
import {FC} from "react";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {columns} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";

interface MeasurementCaseTableProps {
  measurementCases: MeasurementCaseFromCatalogue[]
  getDialogFullName: (param: number | 'new') => string
  onEntityEdit: (id: MeasurementCaseFromCatalogue['id'], value: MeasurementCaseFromCatalogue) => void,
  onEntityDelete: (id: MeasurementCaseFromCatalogue['id']) => void,
  onRowDoubleClick?: (item: MeasurementCaseFromCatalogue) => void
}

export const MeasurementCaseTable: FC<MeasurementCaseTableProps> = ({
  measurementCases,
  getDialogFullName,
  onEntityEdit,
  onEntityDelete,
  onRowDoubleClick
}) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" >
      <Table.Root
        width="100%"
        interactive
        stickyHeader
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
              <Table.Row
                key={item.id}
                onDoubleClick={() => onRowDoubleClick?.(item) }
              >
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
                                    onSave={(values) => onEntityEdit(item.id, values)}
                                    onDeleteConfirmPopoverExit={exitCallback}
                                    confirmText={'Подтвердить создание?'}
                                    confirmButtonLabel={'Подтвердить'}
                                  />
                                ),
                                exitCallback,
                                size: "cover"
                              })
                            }}
                            onEntityClick={() => onEntityDelete(item.id)}
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
                          {...(column.width && {width: `${column.width - 24}px`})}
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
    </Table.ScrollArea>
  )
}
