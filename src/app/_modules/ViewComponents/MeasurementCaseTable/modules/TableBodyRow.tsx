'use client'

import * as React from "react";
import {ReactNode} from "react";
import {HStack, Table, Text} from '@chakra-ui/react';
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {Cell, flexRender} from "@tanstack/react-table";
import {LegendColors, MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {TableColumnMeta} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";
import {accumulateLeftGapFabric} from "@/app/_modules/ViewComponents/MeasurementCaseTable/utils";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";

interface MeasurementCaseTableProps {
  id: string
  original: MeasurementCaseFromCatalogue
  colors: Record<number, LegendColors>
  getVisibleCells: () => Cell<MeasurementCaseFromCatalogue, unknown>[]
  getDialogFullName: (param: number | 'new') => string
  onEntityEdit: (id: MeasurementCaseFromCatalogue['id'], value: MeasurementCaseFromCatalogue) => void,
  onEntityDelete: (id: MeasurementCaseFromCatalogue['id']) => void,
  onRowDoubleClick?: (item: MeasurementCaseFromCatalogue) => void
}

export const TableBodyRow = ({
  id,
  original,
  colors,
  getVisibleCells,
  getDialogFullName,
  onEntityEdit,
  onEntityDelete,
  onRowDoubleClick,
}: MeasurementCaseTableProps) => {
  const accumulateLeftGap = accumulateLeftGapFabric();

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
        const size = cell.column.columnDef.size || 0
        const isSticked = (cell.column.columnDef.meta as TableColumnMeta)?.sticked

        // @ts-ignore
        const suffix = (cell.column.columnDef.meta as TableColumnMeta)?.suffix
        const strokeColor = colors?.[original.id]

        const renderCellContent = (contentText: ReactNode) => {
          if (accessorKey === MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR) {
            return (
              <div
                style={{
                  height: '15px',
                  width: '100%',
                  backgroundColor: strokeColor
                }}
              />
            )
          }

          if (accessorKey === MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID) {
            return (
              <HStack gap={0}>
                {contentText}
                {actionButtons}
              </HStack>
            )
          }

          return contentText
        }

        return (
          <Table.Cell
            key={cell.id}
            padding={'6px 10px'}
            {...(size && {width: `${size}px`})}
            {...(isSticked && {
              ['data-sticky']: "end",
              left: accumulateLeftGap(size)
            })}
          >
            {
              renderCellContent(
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
            }
          </Table.Cell>
        )
      })}
    </Table.Row>
  )
}
