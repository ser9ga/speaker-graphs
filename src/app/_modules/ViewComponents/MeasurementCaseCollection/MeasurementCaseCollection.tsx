import * as React from "react";
import {useEffect, useState} from "react";
import {Grid} from '@chakra-ui/react';
import {MeasurementCaseTable} from "@/app/_modules/ViewComponents/MeasurementCaseTable/MeasurementCaseTable";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {services} from "@/app/_modules/services";
import {
  MeasurementCaseCollectionTableActionBar
} from "@/app/_modules/ViewComponents/MeasurementCaseCollectionTableActionBar/MeasurementCaseCollectionTableActionBar";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {
  MeasurementCaseSelectedCollectionTableActionBar
} from "@/app/_modules/ViewComponents/MeasurementCaseSelectedCollectionTableActionBar/MeasurementCaseSelectedCollectionTableActionBar";
import {SpinnerWrapper} from "@/app/_modules/ViewComponents/SpinnerWrapper/SpinnerWrapper";
import {
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel, Row,
  useReactTable
} from "@tanstack/react-table";
import {columns} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";

export const MeasurementCaseCollection = () => {
  const [measurementCases, setMeasurementCases] = useState<MeasurementCaseFromCatalogue[]>([])
  const [checkedMeasurementCases, setCheckedMeasurementCases] = useState<MeasurementCaseFromCatalogue[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const measurementCaseService = services.measurementCases

  const getMeasurementCases = async () => {
    setIsLoading(true);
    const res = await measurementCaseService.getAll();

    if (res?.isError) {
      return;
    }

    setMeasurementCases(res)
    setIsLoading(false);
  };

  useEffect(
    () => {
      getMeasurementCases()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getDialogFullName = (id: number | 'new') => `measurementCase_${id}`

  const onEntityAdd = async (values: Omit<MeasurementCaseFromCatalogue, 'id'>) => {
    const res = await measurementCaseService.add(values);

    if (res?.isError) {
      return;
    }

    await commonDialog.close(getDialogFullName('new'))

    toaster.create({
      title: 'Случай измерения успешно создан',
      type: "success",
    })

    await getMeasurementCases()
  }

  const onEntityEdit = async (id: number, values: MeasurementCaseFromCatalogue) => {
    const res = await measurementCaseService.update(values);

    if (res?.isError) {
      return;
    }

    await commonDialog.close(getDialogFullName(id))

    toaster.create({
      title: 'Случай измерения успешно изменён',
      type: "success",
    })

    await getMeasurementCases()
  }

  const onEntityDelete = async (id: number) => {
    const res = await measurementCaseService.remove(id);

    if (res?.isError) {
      return;
    }

    toaster.create({
      title: 'Случай измерения успешно удалён',
      type: "success",
    })

    await getMeasurementCases()
  }

  function multiSelectFilter(rows: Row<MeasurementCaseFromCatalogue>, columnIds: string, filterValue: (string | number)[]) {
    if (!filterValue?.length) {
      return true
    }

    const cellValue = rows.getValue(columnIds) as (string | number)

    return filterValue?.includes(cellValue)
  }

  const table = useReactTable
  ({
    data: measurementCases,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      myCustomFilterFn: multiSelectFilter,
    },
  })

  const table2 = useReactTable
  ({
    data: checkedMeasurementCases,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      myCustomFilterFn: multiSelectFilter,
    },
  })


  return (
    <SpinnerWrapper isSpinning={isLoading}>
      <Grid
        templateRows={"auto 1fr auto 500px"}
        gap={'15px'}
        width={'100%'}
        height={'100%'}
        minHeight={'0px'}
        minWidth={'0px'}
        padding={'15px'}
        overflow={'hidden'}
      >
        <MeasurementCaseCollectionTableActionBar
          table={table}
          getDialogFullName={getDialogFullName}
          onEntityAdd={onEntityAdd}
          getMeasurementCases={getMeasurementCases}
        />
        <MeasurementCaseTable
          table={table}
          measurementCases={measurementCases}
          getDialogFullName={getDialogFullName}
          onEntityEdit={onEntityEdit}
          onEntityDelete={onEntityDelete}
          onRowDoubleClick={(measurementCase) => {
            setCheckedMeasurementCases(
              prev => {
                if (prev.some(prevMeasurementCase => prevMeasurementCase.id === measurementCase.id)) {
                  return prev
                }

                return [...prev, measurementCase]
              }
            )
          }}
        />
        <MeasurementCaseSelectedCollectionTableActionBar
          checkedMeasurementCases={checkedMeasurementCases}
        />
        <MeasurementCaseTable
          table={table2}
          measurementCases={checkedMeasurementCases}
          getDialogFullName={getDialogFullName}
          onEntityEdit={onEntityEdit}
          onEntityDelete={onEntityDelete}
          onRowDoubleClick={(measurementCase) => {
            setCheckedMeasurementCases(
              prev => {
                return prev.filter(prevMeasurementCase => prevMeasurementCase.id !== measurementCase.id)
              }
            )
          }}
        />
      </Grid>
    </SpinnerWrapper>
  )
}
