import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { getImpedance } from '@/app/Formulas/getImpedance';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/Constants/Unit';

export const getImpedanceValuesForFrequency = (
  storeGraphData: StoreGraphDataItem[] | null,
  currentFrequency: number
) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.I]);

    if (!getIsAllValuesArNotEmpty(voltage, currency)) {
      result[storeGraphDataItem.uniqName] = null;

      return;
    }

    result[storeGraphDataItem.uniqName] = getImpedance(voltage as number, currency as number);

    return;
  })

  return result;
}

