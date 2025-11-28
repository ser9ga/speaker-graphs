import {StoreGraphDataItem} from '@/app/_modules/Types/GraphDataTypes';
import {getIsAllValuesArNotEmpty, normalizeRawNumber} from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import {UNIT} from '@/app/_modules/Constants/Unit';
import {getPower} from '@/app/_modules/Formulas/getPower';

export const calculateAndPackPower = (storeGraphData: StoreGraphDataItem[] | null, currentFrequency: number) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][UNIT.I]);

    if (!getIsAllValuesArNotEmpty(voltage, currency)) {
      result[storeGraphDataItem.uniqName] = null;

      return;
    }

    result[storeGraphDataItem.uniqName] = getPower(voltage as number, currency as number)

    return;
  })

  return result;
}

