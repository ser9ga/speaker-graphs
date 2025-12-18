'use client'

import {Button, CloseButton, Dialog, FileUpload, Flex, Portal} from '@chakra-ui/react';
import {useAppDispatch, useAppSelector} from '@/app/_modules/Store/Hooks';
import {setGraphData} from '@/app/_modules/Store/GraphData/GraphDataSlice';
import {DataFromJsonFile} from '@/app/_modules/Types/dataFromJsonFile';
import {normalizeRawNumber} from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import {parseDataFromFileToGraph} from '@/app/_modules/Utils/parseDataFromFileToGraph';
import {LEGEND_COLORS} from '@/app/_modules/Constants/Colors';
import {isFileChooseModalOpenedSelector} from '@/app/_modules/Store/AppControl/AppControlSelectors';
import {setFileChooseModalOpened} from '@/app/_modules/Store/AppControl/AppControlSlice';
import {useRef, useState} from 'react';
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {HiUpload} from "react-icons/hi";

export const ChooseFileModal = () => {
  const tempDataStorage = useRef<DataFromJsonFile[]>([])
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false)
  const isFileChooseModalOpened = useAppSelector(isFileChooseModalOpenedSelector);
  const dispatch = useAppDispatch();

  const onFileAccept  = async ({files}: {files: Blob[]}) => {
    tempDataStorage.current = [];
    setIsSubmitButtonActive(false)

    const reader = new FileReader();

    let index = 0;

    async function readFile() {
      if( index >= files.length ) return;

      const file = files[index];
      reader.onload = async function(e) {
        const bin = e.target?.result as string;

        const parsedData: DataFromJsonFile = {
          meta: {
            id: null,
            speaker: {
              id: null,
              label: '',
              coil: {
                resistance: 0,
                isDouble: false,
                method: "serial"
              }
            },
            cabinet: {
              id: null,
              label: '',
            },
            port: {
              id: null,
              diameter: 0,
              length: 0,
            },
            car: {
              id: null,
              label: '',
            },
            isDoorOpened: false,
            voltageOfTesting: 0,
          },
          data: {}
        };

        const splitted = bin
          .split('\r\n')
          .map(row => row.split(';'))

        const head = splitted.splice(0,3);

        const getIsDoorOpened = (value: string) => {
          const typedValue = (value.toLowerCase() as 'открыта' | 'закрыта')

          switch (typedValue) {
            case 'открыта': {
              return true
            }

            case 'закрыта': {
              return false
            }

            default: _exhaustiveCheck(typedValue)
          }
        }

        parsedData.meta.speaker.label = head[1][0].trim()
        parsedData.meta.cabinet.label = head[1][1].trim()
        parsedData.meta.port.diameter = Number(head[1][2])
        parsedData.meta.port.length = Number(head[1][3])
        parsedData.meta.car.label = head[1][4].trim()
        parsedData.meta.isDoorOpened = getIsDoorOpened(head[1][5])
        parsedData.meta.voltageOfTesting = Number(head[1][6])

        splitted.forEach((item) => {
          parsedData.data[item[0] as unknown as number] = {
            Uin: normalizeRawNumber(item[1]),
            I: normalizeRawNumber(item[2]),
            Pa: normalizeRawNumber(item[3])
          }
        })

        tempDataStorage.current.push(parsedData);
        setIsSubmitButtonActive(true)

        index += 1

        if (index < files.length) {
          await readFile()
        }
      }

      reader.readAsText(file);
    }

    await readFile();
  }

  const onSubmit = () => {
    const getRandomColorFactory = () => {
      const colorPool  = Object.values(LEGEND_COLORS);

      return () => {
        const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

        return colorPool.splice(colorArrayIndex, 1)[0]
      }
    }

    const getRandomColor = getRandomColorFactory()

    dispatch(setGraphData(tempDataStorage.current.map(
      (parsedData) => {
        return parseDataFromFileToGraph(
          parsedData as unknown as DataFromJsonFile,
          {strokeColor: getRandomColor()}
        )
      }
    )))
    dispatch(setFileChooseModalOpened(false))
    tempDataStorage.current = [];
    setIsSubmitButtonActive(false)
  }

  return (
    <Dialog.Root
      open={isFileChooseModalOpened}
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Импорт файлов</Dialog.Title>
              <Dialog.CloseTrigger
                asChild
                onClick={() => dispatch(setFileChooseModalOpened(false))}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body margin={'20px'}>
              <Flex
                height={'100%'}
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={6}
              >
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={12}
                  accept={['text/csv']}
                  onFileAccept={onFileAccept}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                      <HiUpload />
                      Выберите файлы
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List showSize clearable />
                </FileUpload.Root>
                <Button
                  disabled={!isSubmitButtonActive}
                  onClick={onSubmit}
                >
                  Импортировать
                </Button>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
