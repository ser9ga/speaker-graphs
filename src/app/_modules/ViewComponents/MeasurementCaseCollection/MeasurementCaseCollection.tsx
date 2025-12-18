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

  useEffect(() => {
    getMeasurementCases()
  }, []);

  const getDialogFullName = (id: number | 'new') => `measurementCase_${id}`

  const onEntityAdd = async (values: MeasurementCaseFromCatalogue) => {
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


  return (
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
        getDialogFullName={getDialogFullName}
        onEntityAdd={onEntityAdd}
      />
      <MeasurementCaseTable
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
  )
}
