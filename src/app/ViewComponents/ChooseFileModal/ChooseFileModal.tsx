'use client'

import { Box, Button, CloseButton, Dialog, FileUpload, Flex, Icon, Portal } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/app/Store/Hooks';
// import { toaster } from '@/app/components/ui/toaster';

import { setGraphData } from '@/app/Store/GraphData/GraphDataSlice';
import { DataFromJsonFile } from '@/app/Types/dataFromJsonFile';
import { normalizeRawNumber } from '@/app/Utils/calculateAndPackUnitData/utils';
import { parseDataFromFile } from '@/app/Utils/parseDataFromFile';
import { LEGEND_COLORS } from '@/app/Constants/Colors';
import { isFileChooseModalOpenedSelector } from '@/app/Store/AppControl/AppControlSelectors';
import { LuUpload } from 'react-icons/lu';
import { setFileChooseModalOpened } from '@/app/Store/AppControl/AppControlSlice';
import { useRef, useState } from 'react';
import {_exhaustiveCheck} from "@/app/Utils/Common";

export const ChooseFileModal = () => {
  const tempDataStorage = useRef<DataFromJsonFile[]>([])
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false)
  const isFileChooseModalOpened = useAppSelector(isFileChooseModalOpenedSelector);
  const dispatch = useAppDispatch();

  // toaster.create({ // TODO
  //   description: "File saved successfully",
  //   type: "info",
  // })

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

  return (
    <Dialog.Root
      open={isFileChooseModalOpened}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
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
            <Dialog.Body>
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
                  maxFiles={6}
                  accept={['text/csv']}
                  onFileAccept={onFileAccept}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>Перетащите файлы .csv</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List showSize clearable />
                </FileUpload.Root>
                <Button
                  disabled={!isSubmitButtonActive}
                  onClick={() => {
                    dispatch(setGraphData(tempDataStorage.current.map(
                      (parsedData, index) => {
                        return parseDataFromFile(
                          parsedData as unknown as DataFromJsonFile,
                          {strokeColor: Object.values(LEGEND_COLORS)[index]}
                        )
                      }
                    )))
                    dispatch(setFileChooseModalOpened(false))
                    tempDataStorage.current = [];
                    setIsSubmitButtonActive(false)
                  }}
                >
                  Импортировать файлы
                </Button>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
