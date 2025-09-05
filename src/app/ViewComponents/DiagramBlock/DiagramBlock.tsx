import {CartesianGrid, Label, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { Box, GridItem, Show } from '@chakra-ui/react';
import { DiagramBlockMenu } from '@/app/ViewComponents/DiagramIconMenu/DiagramBlockMenu';
import { DISPLAYED_GRAPH } from '@/app/Constants/DisplayedGraph';
import { VERTICAL_SCALE_OPTION } from '@/app/Constants/VerticalScaleOption';
import { JSX, useMemo } from 'react';
import { _exhaustiveCheck } from '@/app/Utils/Common';
import { LineCollection } from '@/app/ViewComponents/LineCollection/LineCollection';
import { GRAPH_LITERALS } from '@/app/Constants/GraphLiterals';
import { GraphName } from '@/app/Constants/GraphName';
import { useAppDispatch, useAppSelector } from '@/app/Store/Hooks';
import {
  currentDisplayedGraphSelector,
  isCleanLookEnabledSelector, isGraphExpandedSelector,
  verticalScaleOptionSelector
} from '@/app/Store/AppControl/AppControlSelectors';
import { toggleCleanLook, toggleGraphExpansion } from '@/app/Store/AppControl/AppControlSlice';
import { Unit } from '@/app/Constants/Unit';
import { getUnitDataByUnitName } from '@/app/Store/GraphData/GraphDataSelectors';

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
  const verticalScaleOption = useAppSelector(verticalScaleOptionSelector);
  const unitData = useAppSelector(getUnitDataByUnitName(unitName));
  const isGraphExpanded = useAppSelector(isGraphExpandedSelector);

  const dispatch = useAppDispatch()

  const domain = useMemo(() => {
    switch (verticalScaleOption) {
      case VERTICAL_SCALE_OPTION.ZOOMED: {
        return ['auto', 'auto']
      }

      case VERTICAL_SCALE_OPTION.FULL: {
        return undefined
      }
    }

    return _exhaustiveCheck(verticalScaleOption)
  }, [verticalScaleOption])

  return (
    <Show <boolean> when={currentDisplayedGraph === DISPLAYED_GRAPH.ALL
      || currentDisplayedGraph === graphName}>
      <GridItem
        position={'relative'}
        onClick={(event: {detail: number}) => {
          isCleanLookEnabled
          && event.detail === 2
          && dispatch(toggleCleanLook())
        }}
      >
        <ResponsiveContainer>
          <LineChart
            data={unitData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Label
              value={GRAPH_LITERALS[graphName].diagramLabel}
              position={'top'}
            />
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              dataKey="argument"
              interval="preserveStart"
            />
            <YAxis
              label={{
                value: GRAPH_LITERALS[graphName].argumentLabel,
                angle: -90,
                position: 'insideLeft'
              }}
              domain={domain}
            />
            <Tooltip
              labelFormatter={(value) => value + ' Гц'}
              separator={''}
              cursor={{
                stroke: 'gold',
                strokeWidth: 2
              }}
            />
            <LineCollection />
          </LineChart>
          <Show <boolean> when={!isCleanLookEnabled}>
            <Box
              position="absolute"
              top={'10px'}
              right={'10px'}
            >
              <DiagramBlockMenu
                buttonCollection={buttonCollection}
                toggleGraphExpansion={() => dispatch(toggleGraphExpansion(graphName))}
                isGraphExpanded={isGraphExpanded}
              />
            </Box>
          </Show>
        </ResponsiveContainer>
      </GridItem>
    </Show>
  )
}
