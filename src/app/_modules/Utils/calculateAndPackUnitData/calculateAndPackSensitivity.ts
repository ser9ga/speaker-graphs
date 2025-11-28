import { StoreGraphDataItem } from '@/app/_modules/Types/GraphDataTypes';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/_modules/Constants/Unit';
import { getSensitivity } from '@/app/_modules/Formulas/getSensitivity';
import { getPower } from '@/app/_modules/Formulas/getPower';

export const calculateAndPackSensitivity = (storeGraphData: StoreGraphDataItem[] | null, currentFrequency: number) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.I]);
    const pressure  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.Pa]);

    if (!getIsAllValuesArNotEmpty(voltage, currency, pressure)) {
      result[storeGraphDataItem.uniqName] = null;

      return;
    }

    const power = getPower(voltage as number, currency as number)

    result[storeGraphDataItem.uniqName] = getSensitivity(pressure as number, power);

    return;
  })

  return result;
}

