import { Line } from 'recharts';
import { useAppSelector } from '@/app/_modules/Store/Hooks';
import {
  getIsLineVisibleSelector,
  getLineColorSelector,
} from '@/app/_modules/Store/GraphData/GraphDataSelectors';

interface LineItemProps {
  id: string
}

export const LineItem = ({
  id,
}: LineItemProps) => {
  const strokeColor = useAppSelector(state => getLineColorSelector(state, id))
  const isVisible = useAppSelector(state => getIsLineVisibleSelector(state, id))

  return (
    <Line
      style={{outline: 'none'}}
      name={' '}
      dataKey={id}
      stroke={strokeColor}
      type="monotone"
      dot={false}
      hide={!isVisible}
    />
  )
}
