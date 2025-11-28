export const getPressureFromGivenVoltage = (
  sensitivity: number,
  powerAtMaxPressure: number,
) => {
  return sensitivity + (Math.log10(powerAtMaxPressure) * 10)
}


