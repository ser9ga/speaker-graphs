import { useAppSelector } from '@/app/Store/Hooks';
import { measurementMetasSelector } from '@/app/Store/GraphData/GraphDataSelectors';
import { LineItem } from '@/app/ViewComponents/LineItem/LineItem';

export const LineCollection = () => {
  const measurements = useAppSelector(measurementMetasSelector)

  return (
    measurements?.map((measurement) => {
      return (
        <LineItem
          key={measurement.uniqName}
          uniqName={measurement.uniqName}
        />
    )})
  )
}
