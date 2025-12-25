'use client'

import {Table} from '@chakra-ui/react';
import * as React from "react";
import {flexRender, Header} from "@tanstack/react-table";
import {
  HeaderCellContentWithFilters
} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderCellContentWithFilters";
import {TableColumnMeta} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {accumulateLeftGapFabric} from "@/app/_modules/ViewComponents/MeasurementCaseTable/utils";

interface MeasurementCaseTableProps {
  id: string
  headers: Header<MeasurementCaseFromCatalogue, unknown>[]
  isFilterable?: boolean
}

export const TableHeaderRow = ({
  id,
  headers,
  isFilterable,
}: MeasurementCaseTableProps) => {
  const accumulateLeftGap = accumulateLeftGapFabric();

  return (
    <Table.Row key={id}>
      {
        headers.map(
          (header) => {
            const size = header.column.columnDef.size || 0
            const isSticked = (header.column.columnDef.meta as TableColumnMeta)?.sticked

            const headerCellContents = flexRender(
              header.column.columnDef.header,
              header.getContext(),
            )

            return (
              <Table.ColumnHeader
                key={header.id}
                height={isFilterable ? '76px' : '44px'}
                {...(size && {width: `${size}px`})}
                {...(isSticked && {
                  ['data-sticky']: "end",
                  left: accumulateLeftGap(size),
                  zIndex: 1
                })}
              >
                {isFilterable
                  ? (
                    <HeaderCellContentWithFilters
                      // @ts-ignore
                      accessorKey={header.column.columnDef.accessorKey}
                      // @ts-ignore
                      filterVariant={(header.column.columnDef.meta as TableColumnMeta)?.filterVariant}
                       getCanFilter={header.column.getCanFilter}
                      getCanSort={header.column.getCanSort}
                      getFacetedUniqueValues={header.column.getFacetedUniqueValues}
                      getFilterValue={header.column.getFilterValue}
                      getIsSorted={header.column.getIsSorted}
                      getToggleSortingHandler={header.column.getToggleSortingHandler}
                      setFilterValue={header.column.setFilterValue}
                    >
                      {headerCellContents}
                    </HeaderCellContentWithFilters>
                  )
                  : headerCellContents
                }
              </Table.ColumnHeader>
            )
          },
        )
      }
    </Table.Row>
  )
}
