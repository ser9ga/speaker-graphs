import * as React from 'react';
import {IconButton, List} from '@chakra-ui/react';
import {useAppDispatch} from '@/app/_modules/Store/Hooks';
import {PiFileCsvLight} from 'react-icons/pi';
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {parseRawCSVStringToGraphData} from "@/app/_modules/ViewComponents/ChooseImportFilesButton/utils";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {colorRandomaizerFactory} from "@/app/_modules/Utils/colorRandomaizer";
import {CSVFileAttributes} from "@/app/_modules/Types/csv";
import {errorListDrawer} from "@/app/_modules/ViewComponents/ErrorListDrawer/ErrorListDrawer";

export const ChooseImportFilesButton = () => {
  const dispatch = useAppDispatch();

  const onImportClick = async () => {
    const importDialogKey = 'importFilesDirectToGraphs'

    const rawCSVCollection: CSVFileAttributes[] = await importFilesDialog.open(importDialogKey, {
      onClose: () => {
        importFilesDialog.close(importDialogKey);
      },
      onSubmit: async (fileAttributes) => {
        importFilesDialog.close(importDialogKey, fileAttributes)
      },
      params: {
        maxFiles: 12
      }
    })

    let errors: string[] = []

    const colorRandomaizer = colorRandomaizerFactory()

    const parsedRaws = rawCSVCollection
      .map((rawCSV: CSVFileAttributes) => {
        const [parsedMeasurementCase, error] = parseRawCSVStringToGraphData({
          rawString: rawCSV.content,
          color: colorRandomaizer.getColor()
        })
        errors = error.concat(error)

        return parsedMeasurementCase
      })

    if (errors.length) {

      const errorList = (
        <List.Root>
          {errors.map((error) => <List.Item key={error}>{error}</List.Item>)}
        </List.Root>
      )

      errorListDrawer.open('importCollectionErrors', {errorList})
    } else {
      toaster.create({
        title: 'Парсинг файлов удачно завершен',
        type: "success",
      })
    }

    dispatch(setGraphData(parsedRaws))
  }

  return (
    <IconButton onClick={onImportClick}>
      <PiFileCsvLight />
    </IconButton>
  );
}
