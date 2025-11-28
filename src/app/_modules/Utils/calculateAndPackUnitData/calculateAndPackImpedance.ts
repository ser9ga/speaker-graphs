import { StoreGraphDataItem } from '@/app/_modules/Types/GraphDataTypes';
import { getImpedance } from '@/app/_modules/Formulas/getImpedance';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/_modules/Constants/Unit';

export const calculateAndPackImpedance = (
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

