import React from 'react'

import {Updater,} from '@tanstack/react-table'
import {HeaderSelect} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderSelect";
import {HeaderSearch} from "@/app/_modules/ViewComponents/MeasurementCaseTable/modules/HeaderSearch";

export const FilterContent = ({
  accessorKey,
  filterVariant,
  getCanFilter,
  getFilterValue,
  setFilterValue,
  getFacetedUniqueValues,

}: {
  accessorKey: string
  filterVariant: string | undefined
  getCanFilter: () => boolean
  getFilterValue: () => unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilterValue: (updater: Updater<any>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFacetedUniqueValues: () => Map<any, number>

}) => {
  if (!getCanFilter()) {
    return null
  }

  if (filterVariant === 'select') {
    return (
      <HeaderSelect
        accessorKey={accessorKey}
        getFilterValue={getFilterValue}
        setFilterValue={setFilterValue}
        getFacetedUniqueValues={getFacetedUniqueValues}
      />
    )
  }

  if (filterVariant === 'search') {
    return (
      <HeaderSearch
        getFilterValue={getFilterValue}
        setFilterValue={setFilterValue}
      />
    )
  }

  return null
}
