'use client'

import {Button, HStack} from "@chakra-ui/react"
import * as React from "react";
import {GrUploadOption} from "react-icons/gr";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {setGraphData} from "@/app/_modules/Store/GraphData/GraphDataSlice";
import {useAppDispatch} from "@/app/_modules/Store/Hooks";
import {addOptionsToMeasurementCaseForGraph} from "@/app/_modules/Utils/measurementCaseFormUtils";
import {getRandomColorFactory} from "@/app/_modules/Utils/colorRandomaizer";
import {setActiveTab} from "@/app/_modules/Store/AppControl/AppControlSlice";
import {MAIN_TAB_NAME} from "@/app/_modules/Constants";

interface MeasurementCaseSelectedCollectionTableActionBarProps {
  checkedMeasurementCases: MeasurementCaseFromCatalogue[]
}

export const MeasurementCaseSelectedCollectionTableActionBar: React.FC<MeasurementCaseSelectedCollectionTableActionBarProps> = ({checkedMeasurementCases}) => {
  const dispatch = useAppDispatch()

  return (
    <HStack
      justifySelf={'end'}
    >
      <Button
        variant={"solid"}
        onClick={() => {
          const getRandomColor = getRandomColorFactory()

          const parsedRaws = checkedMeasurementCases
            .map(measurementCase => addOptionsToMeasurementCaseForGraph(measurementCase, getRandomColor()))

          dispatch(setGraphData(parsedRaws))
          dispatch(setActiveTab(MAIN_TAB_NAME.GRAPH_DRAWS))
        }}
      >
        <GrUploadOption />
        Сформировать графики
      </Button >
    </HStack>
  )
}
