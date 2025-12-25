'use client'

import {IconButton} from '@chakra-ui/react';
import * as React from "react";
import {ReactNode} from "react";
import {HiChevronDown, HiChevronUp, HiChevronUpDown} from "react-icons/hi2";
import {SortDirection} from "@tanstack/table-core";

interface MeasurementCaseTableHeaderSortingProps {
  getCanSort: () => boolean,
  getIsSorted: () => false | SortDirection,
  getToggleSortingHandler: () => ((event: unknown) => void) | undefined
}

export function HeaderSort ({
  getCanSort,
  getIsSorted,
  getToggleSortingHandler
}: MeasurementCaseTableHeaderSortingProps) {
  const canSort = getCanSort()

  const sortDirection = getIsSorted()

  if (!canSort) {
    return null
  }

  const button = (icon: ReactNode) => (
    <IconButton
      size={'xs'}
      variant={'ghost'}
      onClick={getToggleSortingHandler()}
    >
      {icon}
    </IconButton>
  )

  if (!sortDirection) {
    return button(<HiChevronUpDown />)
  }

  if (sortDirection === 'asc') {
    return button(<HiChevronUp />)
  }

  if (sortDirection === 'desc') {
    return button(<HiChevronDown />)
  }

  return null
}
