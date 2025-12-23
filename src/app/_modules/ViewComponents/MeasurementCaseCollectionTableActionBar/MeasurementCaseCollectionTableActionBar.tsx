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
  MeasurementCaseFromCatalogue,
  PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {PiFileCsvLight} from "react-icons/pi";
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {
  parseRawCSVStringToMeasurementCase
} from "@/app/_modules/ViewComponents/MeasurementCaseCollectionTableActionBar/utils";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {services} from "@/app/_modules/services";

interface Props {
  getDialogFullName: (param: number | 'new') => string
  onEntityAdd: (values: MeasurementCaseFromCatalogue) => void
}

export const MeasurementCaseCollectionTableActionBar: React.FC<Props> = ({
  getDialogFullName,
  onEntityAdd
}) => {
  // TODO переделать на RTQ
  const [speakers, setSpeakers] = useState<SpeakerFromCatalogue[]>([])
  const [cabinets, setCabinets] = useState<CabinetFromCatalogue[]>([])
  const [ports, setPorts] = useState<PortFromCatalogue[]>([])
  const [cars, setCars] = useState<CarFromCatalogue[]>([])

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

  return (
    <HStack
      justifySelf={'end'}
    >
      <Button
        variant={"solid"}
        onClick={() => {
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
        }}
      >
        <IoIosAdd />
        Создать
      </Button >
      <Button
        variant={"solid"}
        onClick={async () => {
          const importDialogKey = 'importSingleFileInFormDialog'
          const rawCSVString = await importFilesDialog.open(importDialogKey, {
            onClose: () => {
              importFilesDialog.close(importDialogKey);
            },
            onSubmit: async (qweqwe) => {
              importFilesDialog.close(importDialogKey, qweqwe)
            },
          })

          const [parsedMeasurementCase, errors] = parseRawCSVStringToMeasurementCase({
            rawString: rawCSVString?.[0],
            speakers,
            cabinets,
            ports,
            cars
          })

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
        }}
      >
        <PiFileCsvLight />
        Импортировать файл
      </Button >
      <Button
        variant={"solid"}
        onClick={() => {}}
        disabled
      >
        <PiFileCsvLight />
        Импортировать коллекцию
      </Button >
    </HStack>
  )
}
