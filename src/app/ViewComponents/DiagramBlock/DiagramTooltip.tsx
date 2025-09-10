import {GRAPH_LITERALS} from '@/app/Constants/GraphLiterals';
import {GraphName} from '@/app/Constants/GraphName';
import {Tooltip} from "recharts";
import {currentMouseOnGraphSelector} from "@/app/Store/AppControl/AppControlSelectors";
import {useAppSelector} from "@/app/Store/Hooks";

interface DiagramTooltipProps {
  graphName: GraphName
}

export const DiagramTooltip = ({
  graphName,
}: DiagramTooltipProps)  => {
  const isBadgeVisible = useAppSelector(currentMouseOnGraphSelector) === graphName

  return (
    <Tooltip
      {...(!isBadgeVisible && {contentStyle: {display: 'none'}} )}
      labelFormatter={(value) => value + ' Гц'}
      separator={''}
      cursor={{
        stroke: 'gold',
        strokeWidth: 2
      }}
      formatter={(value) => {
        return `${Math.round(Number(value) * 100) / 100} ${GRAPH_LITERALS[graphName].unitLabel}`
      }}
    />
  )
}
