import { Unit } from '@/app/_modules/Constants/Unit';
import { MeasurementCaseForGraph } from '@/app/_modules/Types/dataForGraphs';
import {GraphDrawDataItem} from "@/app/_modules/Types/graphDraw";

// TODO возможно не нужно
export const pickUnitData = (
  storeGraphData: MeasurementCaseForGraph[] | null,
  unit: Unit
) =>
  [...Array(51)].map((_, i) => {
    const currentFrequency = i + 20

    const result: GraphDrawDataItem  = {
      argument: currentFrequency.toString()
    }

    storeGraphData?.forEach((storeGraphDataItem) => {
      // @ts-ignore
      const rawUnitValue  = storeGraphDataItem.data[currentFrequency][unit]

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

      result[storeGraphDataItem.id] = finalValue
    })

    return result;
  });
