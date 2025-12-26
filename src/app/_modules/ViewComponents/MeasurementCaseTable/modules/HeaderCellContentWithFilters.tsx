'use client'

import {HStack, VStack} from '@chakra-ui/react';
import * as React from "react";
import {Updater} from "@tanstack/react-table";
import {HeaderSort} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderSort";
import {FilterContent} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderFilter";
import {SortDirection} from "@tanstack/table-core";
import {ReactNode} from "react";

interface MeasurementCaseTableProps {
  accessorKey: string
  filterVariant: string | undefined
  getCanFilter: () => boolean
  getCanSort: () => boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFacetedUniqueValues: () => Map<any, number>
  getFilterValue: () => unknown
  getIsSorted: () => false | SortDirection,
  getToggleSortingHandler: () => ((event: unknown) => void) | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilterValue: (updater: Updater<any>) => void
  isFilterable: boolean | undefined;
  children: ReactNode
}

export const HeaderCellContentWithFilters = ({
  accessorKey,
  filterVariant,
  getCanFilter,
  getCanSort,
  getFacetedUniqueValues,
  getFilterValue,
  getIsSorted,
  getToggleSortingHandler,
  setFilterValue,
  isFilterable,
  children
}: MeasurementCaseTableProps)=> {
  const commonPart = (
    <HStack
      height={'22px'}
      padding={'0 4px'}
    >
      {children}
      <HeaderSort
        getCanSort={getCanSort}
        getIsSorted={getIsSorted}
        getToggleSortingHandler={getToggleSortingHandler}
      />
    </HStack>
  )

  if (isFilterable) {
    return (
      <VStack
        width={'100%'}
        height={'100%'}
        justifyContent={'start'}
        alignItems={'start'}
      >
        {commonPart}
        <FilterContent
          // @ts-ignore
          accessorKey={accessorKey}
          // @ts-ignore
          filterVariant={filterVariant}
          getFacetedUniqueValues={getFacetedUniqueValues}
          getCanFilter={getCanFilter}
          setFilterValue={setFilterValue}
          getFilterValue={getFilterValue}
        />
      </VStack>
    )
  }

  return commonPart
}
