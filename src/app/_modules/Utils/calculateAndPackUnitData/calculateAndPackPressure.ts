import { MeasurementCaseForGraph } from '@/app/_modules/Types/dataForGraphs';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { UNIT } from '@/app/_modules/Constants/Unit';

export const calculateAndPackPressure = (
  storeGraphData: MeasurementCaseForGraph[] | null,
  currentFrequency: number
) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {

    const pressure  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][UNIT.Pa]);

    if (!getIsAllValuesArNotEmpty(pressure)) {
      result[storeGraphDataItem.id] = null;

      return;
    }

    result[storeGraphDataItem.id] = pressure as number;

    return;
  })

  return result;
}

