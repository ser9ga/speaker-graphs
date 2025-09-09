import { UNIT, Unit } from '@/app/Constants/Unit';
import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { calculateAndPackImpedance } from '@/app/Utils/calculateAndPackUnitData/calculateAndPackImpedance';
import {
  calculateAndPackSensitivity
} from '@/app/Utils/calculateAndPackUnitData/calculateAndPackSensitivity';
import { calculateAndPackPressure } from '@/app/Utils/calculateAndPackUnitData/calculateAndPackPressure';
import {
  calculateAndPackPowerFromGivenVoltage
} from '@/app/Utils/calculateAndPackUnitData/calculateAndPackPowerFromGivenVoltage';
import {calculateAndPackPower} from "@/app/Utils/calculateAndPackUnitData/calculateAndPackPower";

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
      result = calculateAndPackImpedance(storeGraphData, currentFrequency);
    }

    if (targetUnit === UNIT.S)  {
      result = calculateAndPackSensitivity(storeGraphData, currentFrequency);
    }

    if (targetUnit === UNIT.PaUout)  {
      result = calculateAndPackPowerFromGivenVoltage(
        storeGraphData,
        currentFrequency,
        {substitutedVoltageOfTesting: params?.substitutedVoltageOfTesting}
      );
    }

    if (targetUnit === UNIT.P)  {
      result = calculateAndPackPower(storeGraphData, currentFrequency);
    }

    return {
      argument: currentFrequency.toString(),
      ...result
    };
  })
}
