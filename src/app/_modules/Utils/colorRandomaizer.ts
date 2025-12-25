import {LEGEND_COLORS, LegendColors} from "@/app/_modules/Constants";

export const colorRandomaizerFactory = () => {
  let colorPool  = Object.values(LEGEND_COLORS);

  const getColor = () => {
    const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

    return colorPool.splice(colorArrayIndex, 1)[0]
  }

  const passOffColor = (color: LegendColors) => {
    colorPool.push(color)
  }

  const reset = () => {
    colorPool  = Object.values(LEGEND_COLORS);
  }

  return {
    getColor,
    passOffColor,
    reset,
  }
}
