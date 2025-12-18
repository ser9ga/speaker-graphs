import { MeasurementCaseForGraph } from '@/app/_modules/Types/dataForGraphs';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/_modules/Constants/Unit';
import { getSensitivity } from '@/app/_modules/Formulas/getSensitivity';
import { getPower } from '@/app/_modules/Formulas/getPower';

export const calculateAndPackSensitivity = (storeGraphData: MeasurementCaseForGraph[] | null, currentFrequency: number) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.I]);
    const pressure  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.Pa]);

    if (!getIsAllValuesArNotEmpty(voltage, currency, pressure)) {
      result[storeGraphDataItem.id] = null;

      return;
    }

    const power = getPower(voltage as number, currency as number)

    result[storeGraphDataItem.id] = getSensitivity(pressure as number, power);

    return;
  })

  return result;
}

