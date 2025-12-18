import * as React from 'react';
import {IconButton, List} from '@chakra-ui/react';
import {useAppDispatch} from '@/app/_modules/Store/Hooks';
import {PiFileCsvLight} from 'react-icons/pi';
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {parseRawCSVStringToGraphData} from "@/app/_modules/ViewComponents/ChooseImportFilesButton/utils";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {getRandomColorFactory} from "@/app/_modules/Utils/colorRandomaizer";

export const ChooseImportFilesButton = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      onClick={async () => {
        const importDialogKey = 'importFilesDirectToGraphs'

        const rawCSVStrings = await importFilesDialog.open(importDialogKey, {
          maxFiles: 12,
          onClose: () => {
            importFilesDialog.close(importDialogKey);
          },
          onSubmit: async (qweqwe) => {
            importFilesDialog.close(importDialogKey, qweqwe)
          },
        })

        let errors: string[] = []

        const getRandomColor = getRandomColorFactory()

        const parsedRaws =rawCSVStrings
          .map((rawString: string) => {
            const [parsedMeasurementCase, error] = parseRawCSVStringToGraphData({rawString, getRandomColor})
            errors = error.concat(error)

            return parsedMeasurementCase
          })

        if (errors.length) {
          toaster.create({
            title: 'Ошибки при прасинге файлов11',
            description: (
              <List.Root>
                {errors.map((error) => <List.Item key={error}>{error}</List.Item>)}
              </List.Root>
            ),
            type: "error",
          })
        } else {
          toaster.create({
            title: 'Парсинг файлов удачно завершен',
            type: "success",
          })
        }

        dispatch(setGraphData(parsedRaws))
      }}
    >
      <PiFileCsvLight />
    </IconButton>
  );
}
