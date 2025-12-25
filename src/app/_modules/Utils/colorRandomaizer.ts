import {LEGEND_COLORS, LegendColors} from "@/app/_modules/Constants";

export const getRandomColorFactory = () => {
  const colorPool  = Object.values(LEGEND_COLORS);

  return () => {
    const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

    return colorPool.splice(colorArrayIndex, 1)[0]
  }
}

export const colorRandomaizerFactory = () => {
  const colorPool  = Object.values(LEGEND_COLORS);

  const getColor = () => {
    const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

    return colorPool.splice(colorArrayIndex, 1)[0]
  }

  const passOffColor = (color: LegendColors) => {
    colorPool.push(color)
  }

  return {
    getColor,
    passOffColor,
  }
}
