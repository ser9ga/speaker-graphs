import {Flex, GridItem, Show, Text} from '@chakra-ui/react';
import {DISPLAYED_GRAPH} from '@/app/Constants/DisplayedGraph';
import {VERTICAL_SCALE_OPTION} from '@/app/Constants/VerticalScaleOption';
import {JSX, useMemo} from 'react';
import {_exhaustiveCheck} from '@/app/Utils/Common';
import {GRAPH_LITERALS} from '@/app/Constants/GraphLiterals';
import {GraphName} from '@/app/Constants/GraphName';
import {useAppDispatch, useAppSelector} from '@/app/Store/Hooks';
import {
  currentDisplayedGraphSelector,
  horizontalScaleOptionSelector,
  isCleanLookEnabledSelector
} from '@/app/Store/AppControl/AppControlSelectors';
import {toggleCleanLook} from '@/app/Store/AppControl/AppControlSlice';
import {Unit} from '@/app/Constants/Unit';
import {getUnitDataByUnitName} from '@/app/Store/GraphData/GraphDataSelectors';
import {getFilteredNotEmptyUnitData} from "@/app/Utils/getFlteredNotEmptyUnitData";
import {Diagram} from "@/app/ViewComponents/DiagramBlock/Diagram";

interface DiagramBlockProps {
  graphName: GraphName
  unitName: Unit
  buttonCollection?: JSX.Element[]
}

export const DiagramBlock = ({
  graphName,
  unitName,
  buttonCollection,
}: DiagramBlockProps) => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector);
  const currentDisplayedGraph = useAppSelector(currentDisplayedGraphSelector);
  const horizontalScaleOption = useAppSelector(horizontalScaleOptionSelector);
  const unitData = useAppSelector(state => getUnitDataByUnitName(state, unitName));
  
  const dispatch = useAppDispatch()

  const data = useMemo(() => {
    switch (horizontalScaleOption) {
      case VERTICAL_SCALE_OPTION.ZOOMED: {
        return getFilteredNotEmptyUnitData(unitData)
      }

      case VERTICAL_SCALE_OPTION.FULL: {
        return unitData
      }
    }

    return _exhaustiveCheck(horizontalScaleOption)
  }, [unitData, horizontalScaleOption])

  return (
    <Show <boolean> when={currentDisplayedGraph === DISPLAYED_GRAPH.ALL
      || currentDisplayedGraph === graphName}>
      <GridItem
        position={'relative'}
        onClick={(event: {detail: number}) => {
          if (isCleanLookEnabled && event.detail === 2) {
            dispatch(toggleCleanLook())
          }
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={'10px'}
          direction={'column'}
          height={'100%'}
          width={'100%'}
          minWidth={'0px'}
        >
          <Text textStyle="xl">
            {`${GRAPH_LITERALS[graphName].diagramLabel}, ${GRAPH_LITERALS[graphName].unitLabel}`}
          </Text>
          <Diagram
            data={data}
            graphName={graphName}
            buttonCollection={buttonCollection}
          />
        </Flex>
      </GridItem>
    </Show>
  )
}
