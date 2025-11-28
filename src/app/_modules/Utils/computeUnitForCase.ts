import { Unit } from '@/app/_modules/Constants/Unit';
import { StoreGraphDataItem } from '@/app/_modules/Types/GraphDataTypes';
import {GraphDataItem} from "@/app/_modules/Types/Types";

// TODO
export const pickUnitData = (
  storeGraphData: StoreGraphDataItem[] | null,
  unit: Unit
) =>
  [...Array(51)].map((_, i) => {
    const currentFrequency = i + 20

    const result: GraphDataItem  = {
      argument: currentFrequency.toString()
    }

    storeGraphData?.forEach((storeGraphDataItem) => {
      // @ts-ignore
      const rawUnitValue  = storeGraphDataItem.graphData[currentFrequency][unit]

      let finalValue: number | null = null;

      if (typeof rawUnitValue !== 'string' && typeof rawUnitValue !== 'number' ) {
        finalValue = null
      }

      if (typeof rawUnitValue === 'string' ) {
        finalValue = Number(rawUnitValue.replace(',','.'))
      }


      if (typeof rawUnitValue === 'number' ) {
        finalValue = rawUnitValue
      }

      result[storeGraphDataItem.uniqName] = finalValue
    })

    return result;
  });
