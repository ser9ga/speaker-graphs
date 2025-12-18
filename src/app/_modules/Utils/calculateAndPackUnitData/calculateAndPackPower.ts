import {MeasurementCaseForGraph} from '@/app/_modules/Types/dataForGraphs';
import {getIsAllValuesArNotEmpty, normalizeRawNumber} from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import {UNIT} from '@/app/_modules/Constants/Unit';
import {getPower} from '@/app/_modules/Formulas/getPower';

export const calculateAndPackPower = (storeGraphData: MeasurementCaseForGraph[] | null, currentFrequency: number) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.I]);

    if (!getIsAllValuesArNotEmpty(voltage, currency)) {
      result[storeGraphDataItem.id] = null;

      return;
    }

    result[storeGraphDataItem.id] = getPower(voltage as number, currency as number)

    return;
  })

  return result;
}

