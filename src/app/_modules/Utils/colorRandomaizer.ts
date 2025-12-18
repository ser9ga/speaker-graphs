import {LEGEND_COLORS} from "@/app/_modules/Constants";

export const getRandomColorFactory = () => {
  const colorPool  = Object.values(LEGEND_COLORS);

  return () => {
    const colorArrayIndex = Math.floor(Math.random() * colorPool.length)

    return colorPool.splice(colorArrayIndex, 1)[0]
  }
}
