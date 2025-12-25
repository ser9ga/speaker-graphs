'use client'

import {Button, HStack, List} from "@chakra-ui/react"
import * as React from "react";
import {useEffect, useState} from "react";
import {IoIosAdd} from "react-icons/io";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {generateEmptyCatalogMeasurementCase} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {
  CabinetFromCatalogue,
  CarFromCatalogue,
  EditableMeasurementCaseFromCatalogue,
  MeasurementCaseFromCatalogue,
  PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {PiFileCsvLight, PiFolderLight} from "react-icons/pi";
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {
  parseRawCSVStringToMeasurementCase
} from "@/app/_modules/ViewComponents/MeasurementCaseCollectionTableActionBar/utils";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {services} from "@/app/_modules/services";
import {CSVFileAttributes} from "@/app/_modules/Types/csv";
import {errorListDrawer} from "@/app/_modules/ViewComponents/ErrorListDrawer/ErrorListDrawer";
import {TbFilterOff} from "react-icons/tb";
import {Table as TanstackTable} from "@tanstack/react-table";

interface Props {
  table: TanstackTable<MeasurementCaseFromCatalogue>
  getDialogFullName: (param: number | 'new') => string
  onEntityAdd: (values: Omit<MeasurementCaseFromCatalogue, 'id'>) => void
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  getMeasurementCases: Function // TODO
}

export const MeasurementCaseCollectionTableActionBar: React.FC<Props> = ({
  table,
  getDialogFullName,
  onEntityAdd,
  getMeasurementCases
}) => {
  // TODO переделать на RTQ
  const [speakers, setSpeakers] = useState<SpeakerFromCatalogue[]>([]);
  const [cabinets, setCabinets] = useState<CabinetFromCatalogue[]>([]);
  const [ports, setPorts] = useState<PortFromCatalogue[]>([]);
  const [cars, setCars] = useState<CarFromCatalogue[]>([]);

  useEffect(() => {
    (async () => {
      const speakersRes = await services.speakers.getAll()
      const cabinetsRes = await services.cabinets.getAll()
      const portsRes = await services.ports.getAll()
      const carsRes = await services.cars.getAll()

      setSpeakers(speakersRes)
      setCabinets(cabinetsRes)
      setPorts(portsRes)
      setCars(carsRes)
    })()
  }, [])

  const resetFilters = () => {
    table.resetColumnFilters();
    table.resetSorting();
  }

  const createMeasurementCase = () => {
    commonDialog.open(getDialogFullName('new'), {
      title: 'Создание нового случая изменрения',
      content: (
        <ActMeasurementCaseForm
          values={generateEmptyCatalogMeasurementCase()}
          onSave={(values) => onEntityAdd(values)}
          confirmText={'Подтвердить создание?'}
          confirmButtonLabel={'Подтвердить'}
        />
      ),
      // @ts-ignore
      size: "cover"
    })
  }

  const importSingleFile = async () => {
    const importDialogKey = 'importSingleFileInFormDialog'
    const rawCSVCollection: CSVFileAttributes[] = await importFilesDialog.open(importDialogKey, {
      onClose: () => {
        importFilesDialog.close(importDialogKey);
      },
      onSubmit: async (qweqwe) => {
        importFilesDialog.close(importDialogKey, qweqwe)
      },
      params: {
        maxFiles: 1
      }
    })

    const [parsedMeasurementCase, errors] = parseRawCSVStringToMeasurementCase({
      rawString: rawCSVCollection?.[0].content,
      speakers,
      cabinets,
      ports,
      cars,
    })

    parsedMeasurementCase.meta.description = rawCSVCollection?.[0].name

    if (errors.length) {
      toaster.create({
        title: 'Ошибки при прасинге файла',
        description: (
          <List.Root>
            {errors.map((error) => <List.Item key={error}>{error}</List.Item>)}
          </List.Root>
        ),
        type: "error",
      })
    } else {
      toaster.create({
        title: 'Парсинг файла удачно завершен',
        type: "success",
      })
    }

    commonDialog.open(getDialogFullName('new'), {
      title: 'Создание нового случая изменрения',
      content: (
        <ActMeasurementCaseForm
          values={parsedMeasurementCase}
          onSave={(values) => onEntityAdd(values)}
          confirmText={'Подтвердить создание?'}
          confirmButtonLabel={'Подтвердить'}
        />
      ),
      // @ts-ignore
      size: "cover"
    })
  }

  const importFileCollection = async () => {
    const importDialogKey = 'importSingleFileInFormDialog'
    const rawCSVCollection: CSVFileAttributes[] = await importFilesDialog.open(importDialogKey, {
      onClose: () => {
        importFilesDialog.close(importDialogKey);
      },
      onSubmit: async (qweqwe) => {
        importFilesDialog.close(importDialogKey, qweqwe)
      },
      params: {
        directory: true,
        maxFiles: 100000
      }
    })

    // TODO грязь
    const parsedMeasurementCasesWithErrors = rawCSVCollection
      // @ts-ignore
      .reduce((acc, rawCSV) => {
        const [parsedMeasurementCase, errors] = parseRawCSVStringToMeasurementCase({
          rawString: rawCSV.content,
          speakers,
          cabinets,
          ports,
          cars
        });

        console.log('errors', errors)

        parsedMeasurementCase.meta.description = rawCSV.name

        return {
          // @ts-ignore
          measurementCases: acc.measurementCases.concat(parsedMeasurementCase),
          errors: {
            ...acc.errors,
            ...(errors.length && {[rawCSV.name]: errors})
          }
        }
      }, {
        measurementCases: [],
        errors: {},
        // TODO TS дичь
      } as unknown as {
        measurementCases: EditableMeasurementCaseFromCatalogue,
        errors: Record<string, string[]>
      }) as unknown as {
      measurementCases: MeasurementCaseFromCatalogue,
      errors: Record<string, string[]>
    }

    const parsedErrorEntries =  Object.entries(parsedMeasurementCasesWithErrors?.errors || {})

    if (parsedErrorEntries.length) {
      const errorList = (
        <List.Root>
          {parsedErrorEntries
            .map(([fileName, errorTextCollection]) => {
              return (
                <List.Item
                  key={fileName}
                  paddingBottom={'15px'}
                >
                  {fileName}
                  <List.Root ps={'20px'}>
                    {errorTextCollection
                      .map((errorText) => {
                        return (
                          <List.Item key={errorText}>
                            {errorText}
                          </List.Item>
                        )
                      })
                    }
                  </List.Root>
                </List.Item>
              )
            })
          }
        </List.Root>
      )

      errorListDrawer.open('qweqwe', {errorList})
    } else {
      toaster.create({
        title: 'Парсинг файлов удачно завершен',
        type: "success",
      })

      const measurementCaseService = services.measurementCases

      const res = await measurementCaseService.add(parsedMeasurementCasesWithErrors.measurementCases);

        if (res?.isError) {
          return;
        }

        await getMeasurementCases()
      }
    }

  return (
    <HStack
      width={'100%'}
      justifyContent={'space-between'}
    >
      <HStack>
        <Button
          variant={"outline"}
          onClick={resetFilters}
        >
          <TbFilterOff />
          Сбросить фильтры
        </Button >
      </HStack>
      <HStack>
        <Button
          variant={"solid"}
          onClick={createMeasurementCase}
        >
          <IoIosAdd />
          Создать
        </Button >
        <Button
          variant={"outline"}
          onClick={importSingleFile}
        >
          <PiFileCsvLight />
          Импортировать файл
        </Button >
        <Button
          variant={"outline"}
          onClick={importFileCollection}
        >
          <PiFolderLight />
          Импортировать коллекцию
        </Button >
      </HStack>
    </HStack>
  )
}
