'use client'

import {HStack, Table, Text} from '@chakra-ui/react';
import * as React from "react";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {Cell, flexRender} from "@tanstack/react-table";
import {MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {TableColumnMeta} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";

interface MeasurementCaseTableProps {
  id: string
  original: MeasurementCaseFromCatalogue
  getVisibleCells: () => Cell<MeasurementCaseFromCatalogue, unknown>[]
  getDialogFullName: (param: number | 'new') => string
  onEntityEdit: (id: MeasurementCaseFromCatalogue['id'], value: MeasurementCaseFromCatalogue) => void,
  onEntityDelete: (id: MeasurementCaseFromCatalogue['id']) => void,
  onRowDoubleClick?: (item: MeasurementCaseFromCatalogue) => void
}

export const TableBodyRow = ({
  id,
  original,
  getVisibleCells,
  getDialogFullName,
  onEntityEdit,
  onEntityDelete,
  onRowDoubleClick,
}: MeasurementCaseTableProps) => {
  const actionButtons = (
    <EntityActionTableCell
      onEditClick={(exitCallback) => {
        commonDialog.open(getDialogFullName(original.id), {
          title: `Редактирование случая измерения`,
          content: (
            <ActMeasurementCaseForm
              values={original}
              onSave={(values) => onEntityEdit(original.id, values)}
              onDeleteConfirmPopoverExit={exitCallback}
              confirmText={'Подтвердить создание?'}
              confirmButtonLabel={'Подтвердить'}
            />
          ),
          exitCallback,
          // @ts-ignore
          size: "cover"
        })
      }}
      onEntityClick={() => onEntityDelete(original.id)}
    />
  )

  return (
    <Table.Row
      key={id}
      onDoubleClick={() => onRowDoubleClick?.(original) }
    >
      {getVisibleCells().map((cell) => {
        // @ts-ignore
        const accessorKey = cell.column.columnDef?.accessorKey
        const size = cell.column.columnDef.size
        const isSticked = (cell.column.columnDef.meta as TableColumnMeta)?.sticked

        // @ts-ignore
        const suffix = (cell.column.columnDef.meta as TableColumnMeta)?.suffix

        const mainCellDataComponent = (
          <Text
            {...(size && {width: `${size - 24}px`})}
            textStyle="sm"
            truncate
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
            &nbsp;
            {suffix && suffix}
          </Text>
        )

        if (accessorKey === MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID) {
          return (
            <HStack
              key={cell.id}
            >
              <Table.Cell
                {...(size && {width: `${size}px`})}
              >
                <HStack gap={0}>
                  {mainCellDataComponent}
                  {actionButtons}
                </HStack>
              </Table.Cell>
            </HStack>
          )
        }

        return (
          <Table.Cell
            key={cell.id}
            {...(size && {width: `${size}px`})}
            {...(isSticked && {
              ['data-sticky']: "end",
              left: 0
            })}
          >
            {mainCellDataComponent}
          </Table.Cell>
        )
      })}
    </Table.Row>
  )
}
