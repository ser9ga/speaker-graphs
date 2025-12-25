'use client'

import {Table} from '@chakra-ui/react';
import * as React from "react";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {TableBodyRow} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/TableBodyRow";
import {Table as TanstackTable} from "@tanstack/react-table";
import {TableHeaderRow} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/TableHeaderRow";

interface MeasurementCaseTableProps {
  table: TanstackTable<MeasurementCaseFromCatalogue>
  measurementCases: MeasurementCaseFromCatalogue[]
  getDialogFullName: (param: number | 'new') => string
  onEntityEdit: (id: MeasurementCaseFromCatalogue['id'], value: MeasurementCaseFromCatalogue) => void,
  onEntityDelete: (id: MeasurementCaseFromCatalogue['id']) => void,
  onRowDoubleClick?: (item: MeasurementCaseFromCatalogue) => void
  isFilterable?: boolean
}

export function MeasurementCaseTable ({
  table,
  getDialogFullName,
  onEntityEdit,
  onEntityDelete,
  onRowDoubleClick,
  isFilterable
}: MeasurementCaseTableProps) {
  return (
    <Table.ScrollArea
      borderWidth="1px"
      rounded="md"
    >
      <Table.Root
        width="100%"
        interactive
        stickyHeader
        css={{
          "table-layout": 'fixed',
          "& [data-sticky]": {
            position: "sticky",
            bg: "bg",
          },

          "& [data-sticky=end]": {
            _after: {
              content: '""',
              position: "absolute",
              pointerEvents: "none",
              top: "0",
              bottom: "-1px",
              width: "32px",
              insetInlineEnd: "0",
              translate: "100% 0",
              shadow: "inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },
        }}
      >
        <Table.Header>
          {
            table
            .getHeaderGroups()
            .map((headerGroup) => {
              return (
                <TableHeaderRow
                  key={headerGroup.id}
                  id={headerGroup.id}
                  headers={headerGroup.headers}
                  isFilterable={isFilterable}
                />
              )}
            )
          }
        </Table.Header>
        <Table.Body>
          {
            table
            .getRowModel()
            .rows
            .map((row) => {
              return (
                <TableBodyRow
                  key={row.id}
                  id={row.id}
                  original={row.original}
                  getVisibleCells={row.getVisibleCells}
                  getDialogFullName={getDialogFullName}
                  onEntityEdit={onEntityEdit}
                  onEntityDelete={onEntityDelete}
                  onRowDoubleClick={onRowDoubleClick}
                />
              )
            })
          }
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}
