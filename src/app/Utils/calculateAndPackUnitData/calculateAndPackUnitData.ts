import { UNIT, Unit } from '@/app/Constants/Unit';
import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { getImpedanceValuesForFrequency } from '@/app/Utils/calculateAndPackUnitData/calculateAndPackImpedance';
import {
  getSensitivityValuesForFrequency
} from '@/app/Utils/calculateAndPackUnitData/calculateAndPackSensitivity';
import { calculateAndPackPressure } from '@/app/Utils/calculateAndPackUnitData/calculateAndPackPressure';
import {
  calculateAndPackPowerFromGivenVoltage
} from '@/app/Utils/calculateAndPackUnitData/calculateAndPackPowerFromGivenVoltage';

export const calculateAndPackUnitData = (
  storeGraphData: StoreGraphDataItem[] | null,
  targetUnit: Unit,
  params: {
    substitutedVoltageOfTesting: number | null | undefined
  } | undefined) => {
  if (!storeGraphData) {
    return null;
  }

  return [...Array(51)].map((_, i) => {
    const currentFrequency = i + 20

    let result: Record<string, number | null> = {}

    if (targetUnit === UNIT.Pa)  {
      result = calculateAndPackPressure(storeGraphData, currentFrequency);
    }

    if (targetUnit === UNIT.Z)  {
      result = getImpedanceValuesForFrequency(storeGraphData, currentFrequency);
    }

    if (targetUnit === UNIT.S)  {
      result = getSensitivityValuesForFrequency(storeGraphData, currentFrequency);
    }

    if (targetUnit === UNIT.PaUout)  {
      result = calculateAndPackPowerFromGivenVoltage(
        storeGraphData,
        currentFrequency,
        {substitutedVoltageOfTesting: params?.substitutedVoltageOfTesting}
      );
    }

    return {
      argument: currentFrequency.toString(),
      ...result
    };
  })
}
