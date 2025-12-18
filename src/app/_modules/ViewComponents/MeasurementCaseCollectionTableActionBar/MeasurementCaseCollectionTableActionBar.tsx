'use client'

import {Button, HStack, List} from "@chakra-ui/react"
import * as React from "react";
import {useEffect, useState} from "react";
import {IoIosAdd} from "react-icons/io";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {ActMeasurementCaseForm} from "@/app/_modules/ViewComponents/ActMeasurementCaseForm/ActMeasurementCaseForm";
import {generateEmptyMeasurementCase} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {
  CabinetFromCatalogue,
  CarFromCatalogue,
  MeasurementCaseFromCatalogue,
  PortFromCatalogue,
  SpeakerFromCatalogue
} from "@/app/_modules/Types/dataFromCatalogue";
import {PiFileCsvLight} from "react-icons/pi";
import {
  importSingleFileInFormDialog
} from "@/app/_modules/ViewComponents/ImportSingleFileInFormDialog/ImportSingleFileInFormDialog";
import {parseRawCSVStringValue} from "@/app/_modules/ViewComponents/ImportSingleFileInFormDialog/utils";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {services} from "@/app/_modules/services";
import {LEGEND_COLORS} from "@/app/_modules/Constants";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {parseDataFromFileToGraph} from "@/app/_modules/Utils/parseDataFromFileToGraph";
import {DataFromJsonFile} from "@/app/_modules/Types/dataFromJsonFile";
import {useAppDispatch} from "@/app/_modules/Store/Hooks";

interface Props {
  checkedMeasurementCases: MeasurementCaseFromCatalogue[]
  getDialogFullName: (param: number | 'new') => string
  onEntityAdd: (values: MeasurementCaseFromCatalogue) => void
}

export const MeasurementCaseCollectionTableActionBar: React.FC<Props> = ({
  checkedMeasurementCases,
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

  const dispatch = useAppDispatch();

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
                values={generateEmptyMeasurementCase()}
                onSave={(values) => onEntityAdd(values)}
                confirmText={'Подтвердить создание?'}
                confirmButtonLabel={'Подтвердить'}
              />
            ),
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
          const rawCSVString = await importSingleFileInFormDialog.open(importDialogKey, {
            onClose: () => {
              importSingleFileInFormDialog.close(importDialogKey);
            },
            onSubmit: async (qweqwe) => {
              importSingleFileInFormDialog.close(importDialogKey, qweqwe)
            },
          })

          const [parsedMeasurementCase, errors] = parseRawCSVStringValue({
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

          console.log('parsedMeasurementCase', parsedMeasurementCase)

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
            size: "cover"
          })
        }}
      >
        <PiFileCsvLight />
        Импортировать файл
      </Button >
      <Button
        variant={"solid"}
        onClick={() => {
          const getRandomColorFactory = () => {
            const colorPool  = Object.values(LEGEND_COLORS);

            return () => {
              const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

              return colorPool.splice(colorArrayIndex, 1)[0]
            }
          }

          const getRandomColor = getRandomColorFactory()

          dispatch(setGraphData(checkedMeasurementCases
            .map((parsedData) => {
              return parseDataFromFileToGraph(
                parsedData as unknown as DataFromJsonFile,
                {strokeColor: getRandomColor()}
              )
            }
          )))
        }}
        disabled
      >
        <PiFileCsvLight />
        Импортировать коллекцию
      </Button >
    </HStack>
  )
}
