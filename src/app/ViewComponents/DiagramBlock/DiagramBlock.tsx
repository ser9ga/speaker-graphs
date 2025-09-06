import {CartesianGrid, Label, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Box, GridItem, Show} from '@chakra-ui/react';
import {DiagramBlockMenu} from '@/app/ViewComponents/DiagramIconMenu/DiagramBlockMenu';
import {DISPLAYED_GRAPH} from '@/app/Constants/DisplayedGraph';
import {VERTICAL_SCALE_OPTION} from '@/app/Constants/VerticalScaleOption';
import {JSX, useMemo} from 'react';
import {_exhaustiveCheck} from '@/app/Utils/Common';
import {LineCollection} from '@/app/ViewComponents/LineCollection/LineCollection';
import {GRAPH_LITERALS} from '@/app/Constants/GraphLiterals';
import {GraphName} from '@/app/Constants/GraphName';
import {useAppDispatch, useAppSelector} from '@/app/Store/Hooks';
import {
  currentDisplayedGraphSelector,
  isCleanLookEnabledSelector,
  isGraphExpandedSelector,
  verticalScaleOptionSelector
} from '@/app/Store/AppControl/AppControlSelectors';
import {toggleCleanLook, toggleGraphExpansion} from '@/app/Store/AppControl/AppControlSlice';
import {Unit} from '@/app/Constants/Unit';
import {getUnitDataByUnitName} from '@/app/Store/GraphData/GraphDataSelectors';

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
          if (isCleanLookEnabled && event.detail === 2) {
            dispatch(toggleCleanLook())
          }
        }}
      >
        {/* @ts-ignore */}
        <ResponsiveContainer>
          <LineChart
            data={unitData}
            margin={{
              top: 20,
              right: 0,
              left: -27,
              bottom: 0,
            }}
          >
            <Label
              value={`${GRAPH_LITERALS[graphName].diagramLabel}, ${GRAPH_LITERALS[graphName].unitLabel}`}
              position={'top'}
            />
            <CartesianGrid
              strokeDasharray="4 4"
              style={{outline: 'none'}}
            />
            <XAxis
              minTickGap={25}
              dataKey="argument"
              interval="preserveStart"
              style={{fontSize: '12px',}}
            />
            <YAxis
              // TODO
              // label={{
              //   value: GRAPH_LITERALS[graphName].unitLabel,
              //   angle: -90,
              //   position: 'insideLeft',
              //   style: { textAnchor: 'middle' }
              // }}
              domain={domain}
              style={{fontSize: '12px',}}
            />
            <Tooltip
              labelFormatter={(value) => value + ' Гц'}
              separator={''}
              cursor={{
                stroke: 'gold',
                strokeWidth: 2
              }}
              formatter={(value) => {
                return Math.round(Number(value) * 100) / 100
              }}
            />
            <LineCollection />
          </LineChart>
          <Show <boolean> when={!isCleanLookEnabled}>
            <Box
              position="absolute"
              top={'30px'}
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
