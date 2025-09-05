import { Line } from 'recharts';
import { useAppSelector } from '@/app/Store/Hooks';
import {
  getIsLineVisibleSelector,
  getLineColorSelector,
} from '@/app/Store/GraphData/GraphDataSelectors';

interface LineItemProps {
  uniqName: string
}

export const LineItem = ({
  uniqName,
}: LineItemProps) => {
  const strokeColor = useAppSelector(getLineColorSelector(uniqName))
  const isVisible = useAppSelector(getIsLineVisibleSelector(uniqName))

  return (
    <Line
      name={' '}
      dataKey={uniqName}
      stroke={strokeColor}
      type="monotone"
      dot={false} // TODO
      hide={!isVisible}
    />
  )
}
