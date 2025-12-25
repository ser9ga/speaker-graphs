'use client'

import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {
  MEASUREMENT_CASE_TABLE_COLUMN_LABEL
} from "@/app/_modules/Constants/Translations/MeasurementCaseTableColumnLabel";
import {createColumnHelper} from "@tanstack/react-table";
import * as React from "react";
import {ReactNode} from "react";
import {Tooltip} from "@/app/_modules/components/ui/tooltip";
import {MEASUREMENT_CASE_TABLE_COLUMN_ICON} from "@/app/_modules/Constants/MeasurementCaseTableColumnIcon";
import {
  MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX
} from "@/app/_modules/Constants/Translations/MeasurementCaseTableColumnCellSuffix";

export type TableColumnMeta = {
  filterVariant?: 'select' | 'search' | undefined
  sticked?: boolean
  suffix: ReactNode
}

const columnHelper = createColumnHelper<MeasurementCaseFromCatalogue>()

export const columns = [
  // @ts-ignore
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR, {
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 40,
    enableSorting: true,
    enableColumnFilter: false,
    meta: {
      sticked: true,
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 100,
    enableSorting: false,
    enableColumnFilter: false,
    meta: {
      sticked: true,
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 300,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      filterVariant: 'select',
      sticked: true,
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 160,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED]}
      </Tooltip>
    ),
    cell: (info) => info.getValue()
      ? "открыта"
      : "закрыта",
    size: 110,
    enableSorting: false,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    // @ts-ignore
    filterFn: 'myCustomFilterFn',
    meta: {
      filterVariant: 'select',
      suffix: MEASUREMENT_CASE_TABLE_COLUMN_CELL_SUFFIX[MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]
    }
  }),
  columnHelper.accessor(MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION, {
    // @ts-ignore
    header: (
      <Tooltip
        positioning={{placement: 'top'}}
        content={MEASUREMENT_CASE_TABLE_COLUMN_LABEL[MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]}
      >
        {MEASUREMENT_CASE_TABLE_COLUMN_ICON[MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]}
      </Tooltip>
    ),
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    size: 500,
    meta: {
      filterVariant: 'search',
    }
  }),
]
