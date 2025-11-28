import { useAppSelector } from '@/app/_modules/Store/Hooks';
import { measurementMetasSelector } from '@/app/_modules/Store/GraphData/GraphDataSelectors';
import { LineItem } from '@/app/_modules/ViewComponents/LineItem/LineItem';

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
