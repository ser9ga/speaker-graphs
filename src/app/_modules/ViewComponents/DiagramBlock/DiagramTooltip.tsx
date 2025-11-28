import {GRAPH_LITERALS} from '@/app/_modules/Constants/Translations/GraphLiterals';
import {GraphName} from '@/app/_modules/Constants/GraphName';
import {Tooltip} from "recharts";
import {currentMouseOnGraphSelector} from "@/app/_modules/Store/AppControl/AppControlSelectors";
import {useAppSelector} from "@/app/_modules/Store/Hooks";

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
