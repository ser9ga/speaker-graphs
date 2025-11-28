import { StoreGraphDataItem } from '@/app/_modules/Types/GraphDataTypes';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/_modules/Constants/Unit';

export const calculateAndPackPressure = (
  storeGraphData: StoreGraphDataItem[] | null,
  currentFrequency: number
) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {

    const pressure  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.Pa]);

    if (!getIsAllValuesArNotEmpty(pressure)) {
      result[storeGraphDataItem.uniqName] = null;

      return;
    }

    result[storeGraphDataItem.uniqName] = pressure as number;

    return;
  })

  return result;
}

