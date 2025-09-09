import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/Constants/Unit';
import { getSensitivity } from '@/app/Formulas/getSensitivity';
import { getPower } from '@/app/Formulas/getPower';

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

