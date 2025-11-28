export const getSensitivity = (
  pressure: number,
  power: number,
) => {
  return pressure - (Math.log10(power) * 10)
}
