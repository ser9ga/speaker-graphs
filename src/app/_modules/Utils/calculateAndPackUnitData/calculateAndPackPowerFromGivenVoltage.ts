import { MeasurementCaseForGraph } from '@/app/_modules/Types/dataForGraphs';
import { getIsAllValuesArNotEmpty, normalizeRawNumber } from '@/app/_modules/Utils/calculateAndPackUnitData/utils';
import { getSensitivity } from '@/app/_modules/Formulas/getSensitivity';
import { getPower } from '@/app/_modules/Formulas/getPower';
import { getPowerAtMaxPressure } from '@/app/_modules/Formulas/getPowerAtMaxPressure';
import { getPressureFromGivenVoltage } from '@/app/_modules/Formulas/getPressureFromGivenVoltage';
import { getImpedance } from '@/app/_modules/Formulas/getImpedance';
import { MEASURED_UNIT } from '@/app/_modules/Constants/MeasuredUnit';

export const calculateAndPackPowerFromGivenVoltage = (
  storeGraphData: MeasurementCaseForGraph[] | null,
  currentFrequency: number,
  params: {
    substitutedVoltageOfTesting: number | null | undefined
  } | undefined
) => {
  const result: Record<string, number | null> = {}

  storeGraphData?.forEach((storeGraphDataItem) => {
    const voltage  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][MEASURED_UNIT.Uin]);
    const currency  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][MEASURED_UNIT.I]);
    const pressure  = normalizeRawNumber(storeGraphDataItem.data[currentFrequency][MEASURED_UNIT.Pa]);
    const voltageOfTesting  = normalizeRawNumber(params?.substitutedVoltageOfTesting
      || storeGraphDataItem.meta.voltageOfTesting);

    if (!getIsAllValuesArNotEmpty(voltage, currency, pressure, voltageOfTesting)) {
      result[storeGraphDataItem.id] = null;

      return;
    }

    const impedance = getImpedance(voltage as number, currency as number);
    const power = getPower(voltage as number, currency as number)
    const sensitivity = getSensitivity(pressure as number, power);
    const powerAtMaxPressure = getPowerAtMaxPressure(voltageOfTesting as number, impedance);

    result[storeGraphDataItem.id] = getPressureFromGivenVoltage(sensitivity, powerAtMaxPressure);

    return;
  })

  return result;
}

