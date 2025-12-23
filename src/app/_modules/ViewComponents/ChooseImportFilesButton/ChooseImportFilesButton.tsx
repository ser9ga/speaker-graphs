import * as React from 'react';
import {IconButton, List} from '@chakra-ui/react';
import {useAppDispatch} from '@/app/_modules/Store/Hooks';
import {PiFileCsvLight} from 'react-icons/pi';
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {parseRawCSVStringToGraphData} from "@/app/_modules/ViewComponents/ChooseImportFilesButton/utils";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {getRandomColorFactory} from "@/app/_modules/Utils/colorRandomaizer";
import {CSVFileAttributes} from "@/app/_modules/Types/csv";

export const ChooseImportFilesButton = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      onClick={async () => {
        const importDialogKey = 'importFilesDirectToGraphs'

        const rawCSVCollection: CSVFileAttributes[] = await importFilesDialog.open(importDialogKey, {
          onClose: () => {
            importFilesDialog.close(importDialogKey);
          },
          onSubmit: async (qweqwe) => {
            importFilesDialog.close(importDialogKey, qweqwe)
          },
          params: {
            maxFiles: 12
          }
        })

        let errors: string[] = []

        const getRandomColor = getRandomColorFactory()

        const parsedRaws = rawCSVCollection
          .map((rawCSV: CSVFileAttributes) => {
            const [parsedMeasurementCase, error] = parseRawCSVStringToGraphData({rawString: rawCSV.content, getRandomColor})
            errors = error.concat(error)

            return parsedMeasurementCase
          })

        if (errors.length) {
          toaster.create({
            title: 'Ошибки при прасинге файлов',
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
