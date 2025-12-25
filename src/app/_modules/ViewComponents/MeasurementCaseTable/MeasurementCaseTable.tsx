'use client'

import {HStack, Table, Text, VStack} from '@chakra-ui/react';
import * as React from "react";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {flexRender, Table as TanstackTable} from "@tanstack/react-table";
import {MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {HeaderSort} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderSort";
import {FilterContent} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderFilter";

interface MeasurementCaseTableProps {
  table: TanstackTable<MeasurementCaseFromCatalogue>
  measurementCases: MeasurementCaseFromCatalogue[]
  getDialogFullName: (param: number | 'new') => string
  onEntityEdit: (id: MeasurementCaseFromCatalogue['id'], value: MeasurementCaseFromCatalogue) => void,
  onEntityDelete: (id: MeasurementCaseFromCatalogue['id']) => void,
  onRowDoubleClick?: (item: MeasurementCaseFromCatalogue) => void
}

export function MeasurementCaseTable ({
  table,
  getDialogFullName,
  onEntityEdit,
  onEntityDelete,
  onRowDoubleClick
}: MeasurementCaseTableProps) {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" >
      <Table.Root
        width="100%"
        interactive
        stickyHeader
        css={{'table-layout': 'fixed'}}
      >
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const size = header.column.columnDef.size

                return (
                  <Table.ColumnHeader
                    key={header.id}
                    height={'76px'}
                    {...(size && {width: `${size}px`})}
                  >
                    <VStack
                      width={'100%'}
                      height={'100%'}
                      justifyContent={'start'}
                      alignItems={'start'}
                    >
                      <HStack height={'32px'}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <HeaderSort
                          getCanSort={header.column.getCanSort}
                          getIsSorted={header.column.getIsSorted}
                          getToggleSortingHandler={header.column.getToggleSortingHandler}
                        />
                      </HStack>
                      <FilterContent
                        // @ts-ignore
                        accessorKey={header.column.columnDef.accessorKey}
                        // @ts-ignore
                        filterVariant={(header.column.columnDef.meta ?? {})?.filterVariant}
                        getFacetedUniqueValues={header.column.getFacetedUniqueValues}
                        getCanFilter={header.column.getCanFilter}
                        setFilterValue={header.column.setFilterValue}
                        getFilterValue={header.column.getFilterValue}
                      />
                    </VStack>
                  </Table.ColumnHeader>
                )}
              )}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => {
            return (
              <Table.Row
                key={row.id}
                onDoubleClick={() => onRowDoubleClick?.(row.original) }
              >
                {row.getVisibleCells().map((cell) => {
                  const size = cell.column.columnDef.size

                  const mainCellDataComponent = (
                    <Text
                      {...(size && {width: `${size - 24}px`})}
                      textStyle="sm"
                      truncate
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Text>
                  )

                  // @ts-ignore
                  if (cell.column.columnDef?.accessorKey === MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID) {
                    return (
                      <Table.Cell
                        key={cell.id}
                        {...(size && {width: `${size}px`})}
                      >
                        <HStack gap={0}>
                          {mainCellDataComponent}
                          <EntityActionTableCell
                            onEditClick={(exitCallback) => {
                              commonDialog.open(getDialogFullName(row.original.id), {
                                title: `Редактирование случая измерения`,
                                content: (
                                  <ActMeasurementCaseForm
                                    values={row.original}
                                    onSave={(values) => onEntityEdit(row.original.id, values)}
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
                            onEntityClick={() => onEntityDelete(row.original.id)}
                          />
                        </HStack>
                      </Table.Cell>
                    )
                  }

                  return (
                    <Table.Cell
                      key={cell.id}
                      {...(size && {width: `${size}px`})}
                    >
                      {mainCellDataComponent}
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
