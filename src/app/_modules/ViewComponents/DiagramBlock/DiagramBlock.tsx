import {Flex, GridItem, Show, Text} from '@chakra-ui/react';
import {DISPLAYED_GRAPH} from '@/app/_modules/Constants/DisplayedGraph';
import {VERTICAL_SCALE_OPTION} from '@/app/_modules/Constants/VerticalScaleOption';
import {JSX, useMemo} from 'react';
import {_exhaustiveCheck} from '@/app/_modules/Utils/Common';
import {GRAPH_LITERALS} from '@/app/_modules/Constants/Translations/GraphLiterals';
import {GraphName} from '@/app/_modules/Constants/GraphName';
import {useAppSelector} from '@/app/_modules/Store/Hooks';
import {currentDisplayedGraphSelector, horizontalScaleOptionSelector} from '@/app/_modules/Store/GraphSetControl/GraphSetControlSelectors';
import {Unit} from '@/app/_modules/Constants/Unit';
import {getUnitDataByUnitName} from '@/app/_modules/Store/GraphData/GraphDataSelectors';
import {getFilteredNotEmptyUnitData} from "@/app/_modules/Utils/getFlteredNotEmptyUnitData";
import {Diagram} from "@/app/_modules/ViewComponents/DiagramBlock/Diagram";

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
  const currentDisplayedGraph = useAppSelector(currentDisplayedGraphSelector);
  const horizontalScaleOption = useAppSelector(horizontalScaleOptionSelector);
  const unitData = useAppSelector(state => getUnitDataByUnitName(state, unitName));

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
      <GridItem position={'relative'}>
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
