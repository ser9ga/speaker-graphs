import {CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import {Box, Show} from '@chakra-ui/react';
import {DiagramBlockMenu} from '@/app/_modules/ViewComponents/DiagramIconMenu/DiagramBlockMenu';
import {VERTICAL_SCALE_OPTION} from '@/app/_modules/Constants/VerticalScaleOption';
import {JSX, useMemo} from 'react';
import {_exhaustiveCheck} from '@/app/_modules/Utils/Common';
import {LineCollection} from '@/app/_modules/ViewComponents/LineCollection/LineCollection';
import {GraphName} from '@/app/_modules/Constants/GraphName';
import {useAppDispatch, useAppSelector} from '@/app/_modules/Store/Hooks';
import {
  isCleanLookEnabledSelector,
  isGraphExpandedSelector,
  verticalScaleOptionSelector
} from '@/app/_modules/Store/AppControl/AppControlSelectors';
import {setCurrentMouseOnGraph, toggleCleanLook, toggleGraphExpansion} from '@/app/_modules/Store/AppControl/AppControlSlice';
import {DiagramTooltip} from "@/app/_modules/ViewComponents/DiagramBlock/DiagramTooltip";
import {GraphDataItem} from "@/app/_modules/Types/Types";

interface DiagramBlockInnerProps {
  graphName: GraphName
  data: GraphDataItem[]
  buttonCollection?: JSX.Element[]
}

export const Diagram = ({
  graphName,
  data,
  buttonCollection,
}: DiagramBlockInnerProps) => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector);
  const verticalScaleOption = useAppSelector(verticalScaleOptionSelector);
  const isGraphExpanded = useAppSelector(isGraphExpandedSelector);

  const dispatch = useAppDispatch()

  const yDomain = useMemo(() => {
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
    // @ts-ignore
    <ResponsiveContainer style={{position: 'relative'}}>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -24,
          bottom: 0,
        }}
        syncId="anyId"
        onMouseEnter={() => {
          // setIsTooltipVisible(true)
          dispatch(setCurrentMouseOnGraph(graphName))
          // funcContainer(p => !p)
        }}
        onMouseLeave={() => {
          // setIsTooltipVisible(false)

          dispatch(setCurrentMouseOnGraph(null))
          // funcContainer(p => !p)
        }}
        onDoubleClick={() => {
          dispatch(toggleGraphExpansion(graphName))

          if (isCleanLookEnabled) {
            dispatch(toggleCleanLook())
          }
        }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          style={{outline: 'none'}}
        />
        <XAxis
          minTickGap={25}
          dataKey="argument"
          interval="preserveStart"
          style={{fontSize: '12px',}}
          allowDuplicatedCategory={false}
        />
        <YAxis
          domain={yDomain}
          style={{fontSize: '12px',}}
          allowDuplicatedCategory={false}
        />
        <DiagramTooltip graphName={graphName} />
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
  )
}
