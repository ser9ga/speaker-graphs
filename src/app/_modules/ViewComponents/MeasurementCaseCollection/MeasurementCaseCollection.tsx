import * as React from "react";
import {useEffect, useMemo, useState} from "react";
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
  getSortedRowModel,
  Row,
  useReactTable
} from "@tanstack/react-table";
import {columns} from "@/app/_modules/ViewComponents/MeasurementCaseTable/resources";
import {useAppDispatch, useAppSelector} from "@/app/_modules/Store/Hooks";
import {
  colorCollectionSelector,
  measurementCaseCatalogSelector,
  selectedMeasurementCaseCollectionSelector
} from "@/app/_modules/Store/MeasurementCaseCatalog/MeasurementCaseCatalogSelectors";
import {
  eraseColorCollection,
  eraseSelectedMeasurementCaseCollection,
  setColorCollection,
  setMainMeasurementCaseCollection,
  setSelectedMeasurementCaseCollection
} from "@/app/_modules/Store/MeasurementCaseCatalog/MeasurementCaseCatalogSlice";
import {LegendColors, MAIN_TAB_NAME} from "@/app/_modules/Constants";
import {colorRandomaizerFactory} from "@/app/_modules/Utils/colorRandomaizer";
import {addOptionsToMeasurementCaseForGraph} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {setActiveTab} from "@/app/_modules/Store/AppControl/AppControlSlice";

export const MeasurementCaseCollection = () => {
  const colorRandomaizer = useMemo(() => colorRandomaizerFactory(), [])

  const dispatch = useAppDispatch();

  const measurementCases = useAppSelector(measurementCaseCatalogSelector);
  const setMeasurementCases = (cases: MeasurementCaseFromCatalogue[]) => {
    dispatch(setMainMeasurementCaseCollection(cases))
  }
  const selectedMeasurementCases = useAppSelector(selectedMeasurementCaseCollectionSelector);
  const setSelectedMeasurementCases = (cases: MeasurementCaseFromCatalogue[]) => {
    dispatch(setSelectedMeasurementCaseCollection(cases))
  }
  const eraseSelectedMeasurementCases = () => {
    dispatch(eraseSelectedMeasurementCaseCollection())
  }

  const colors = useAppSelector(colorCollectionSelector);
  const setColors = (colors: Record<number, LegendColors>) => {
    dispatch(setColorCollection(colors))
  }
  const eraseColors = () => {
    dispatch(eraseColorCollection())
  }

  const onMeasurementCaseAdd = (measurementCase: MeasurementCaseFromCatalogue) => {
    if (selectedMeasurementCases.length >= 12) {
      toaster.create({
        description: `Достигнут максимальный размер выборки`,
        type: "error",
      })

      return;
    }

    if (!selectedMeasurementCases
      .some(prevMeasurementCase => prevMeasurementCase.id === measurementCase.id)) {
      setSelectedMeasurementCases(selectedMeasurementCases.concat(measurementCase))
      setColors({
        ...colors,
        [measurementCase.id]: colorRandomaizer.getColor()
      })
    }
  }
  const onMeasurementCaseDelete = (measurementCase: MeasurementCaseFromCatalogue) => {
    setSelectedMeasurementCases(selectedMeasurementCases
      .filter(prevMeasurementCase => {
        return prevMeasurementCase.id !== measurementCase.id
      }))

    const copyColors = {...colors};
    colorRandomaizer.passOffColor(colors[measurementCase.id])
    delete copyColors[measurementCase.id];

    setColors(copyColors)
  }

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

  const onEraseSelectedListClick = () => {
    eraseSelectedMeasurementCases();
    eraseColors();
    colorRandomaizer.reset();
  }

  const onDrawGraphsClick = () => {
    const parsedRaws = selectedMeasurementCases
      .map(measurementCase => addOptionsToMeasurementCaseForGraph(measurementCase, colors[measurementCase.id]))

    dispatch(setGraphData(parsedRaws))
    dispatch(setActiveTab(MAIN_TAB_NAME.GRAPH_DRAWS))
  }

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
    data: selectedMeasurementCases,
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
          isResetFiltersDisabled={table.getState().columnFilters.length === 0}
        />
        <MeasurementCaseTable
          table={table}
          measurementCases={measurementCases}
          colors={colors}
          getDialogFullName={getDialogFullName}
          onEntityEdit={onEntityEdit}
          onEntityDelete={onEntityDelete}
          onRowDoubleClick={onMeasurementCaseAdd}
          isFilterable
        />
        <MeasurementCaseSelectedCollectionTableActionBar
          onDrawClick={onDrawGraphsClick}
          onEraseClick={onEraseSelectedListClick}
          isEraseDisabled={selectedMeasurementCases.length === 0}
        />
        <MeasurementCaseTable
          table={table2}
          measurementCases={selectedMeasurementCases}
          colors={colors}
          getDialogFullName={getDialogFullName}
          onEntityEdit={onEntityEdit}
          onEntityDelete={onEntityDelete}
          onRowDoubleClick={onMeasurementCaseDelete}
        />
      </Grid>
    </SpinnerWrapper>
  )
}
