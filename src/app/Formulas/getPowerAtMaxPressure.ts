export const getPowerAtMaxPressure = (
  targetVoltage: number,
  impedance: number,
) => {
  return Math.pow(targetVoltage, 2) / impedance;
}


