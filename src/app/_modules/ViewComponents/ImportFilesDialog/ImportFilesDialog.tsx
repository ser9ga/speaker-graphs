'use client'

import {Button, CloseButton, createOverlay, Dialog, FileUpload, Flex, Portal} from '@chakra-ui/react';
import * as React from 'react';
import {useRef, useState} from 'react';
import {HiUpload} from "react-icons/hi";
import {CSVFileAttributes} from "@/app/_modules/Types/csv";

interface actEntityDialogProps {
  onClose: () => void;
  onSubmit: (rawStringCollection: CSVFileAttributes[]) => void;
  params?: {
    directory?: boolean
    maxFiles?: number
  }
}

export const importFilesDialog = createOverlay<actEntityDialogProps>((props) => {
  const {
    onClose,
    onSubmit,
    open,
    onOpenChange,
    params
  } = props;
  const tempDataStorage = useRef<CSVFileAttributes[]>(null)
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false)

  const onFileAccept  = async ({files}: {files: File[]}) => {
    tempDataStorage.current = [];
    setIsSubmitButtonActive(false);

    const reader = new FileReader();

    let index = 0;

    async function readFile() {
      if( index >= files.length ) return;

      const file = files[index];

      reader.onload = async function(e) {
        tempDataStorage.current?.push({
          name: file.name,
          content: e.target?.result as string
        })

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

  const onSubmitClick = () => {
    if (tempDataStorage.current?.length) {
      onSubmit(tempDataStorage.current);
      tempDataStorage.current = [];
      setIsSubmitButtonActive(false);
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(arg) => {onOpenChange?.(arg)}}
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
                onClick={() => onClose()}
              >
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
                  accept={['text/csv']}
                  onFileAccept={onFileAccept}
                  {...(params?.directory === true && {directory: true})}
                  {...(typeof params?.maxFiles === 'number' && {maxFiles: params.maxFiles})}
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
                  onClick={onSubmitClick}
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
})
