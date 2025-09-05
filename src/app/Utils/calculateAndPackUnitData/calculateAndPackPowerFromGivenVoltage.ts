import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/Utils/calculateAndPackUnitData/utils';
import { getSensitivity } from '@/app/Formulas/getSensitivity';
import { getPower } from '@/app/Formulas/getPower';
import { getPowerAtMaxPressure } from '@/app/Formulas/getPowerAtMaxPressure';
import { getPressureFromGivenVoltage } from '@/app/Formulas/getPressureFromGivenVoltage';
import { getImpedance } from '@/app/Formulas/getImpedance';
import { MEASURED_UNIT } from '@/app/Constants/MeasuredUnit';

export const calculateAndPackPowerFromGivenVoltage = (
  storeGraphData: StoreGraphDataItem[] | null,
  currentFrequency: number,
  params: {
    substitutedVoltageOfTesting: number | null | undefined
  } | undefined
) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][MEASURED_UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][MEASURED_UNIT.I]);
    const pressure  = normalizeRawNumber(storeGraphDataItem.graphData[currentFrequency][MEASURED_UNIT.Pa]);
    const voltageOfTesting  = normalizeRawNumber(params?.substitutedVoltageOfTesting
      || storeGraphDataItem.measurementMeta.voltageOfTesting);

    if (!getIsAllValuesArNotEmpty(voltage, currency, pressure, voltageOfTesting)) {
      result[storeGraphDataItem.uniqName] = null;

      return;
    }

    const impedance = getImpedance(voltage as number, currency as number);
    const power = getPower(voltage as number, currency as number)
    const sensitivity = getSensitivity(pressure as number, power);
    const powerAtMaxPressure = getPowerAtMaxPressure(voltageOfTesting as number, impedance);

    result[storeGraphDataItem.uniqName] = getPressureFromGivenVoltage(sensitivity, powerAtMaxPressure);

    return;
  })

  return result;
}

