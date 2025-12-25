export const accumulateLeftGapFabric = () => {
  let left = 0;

  return (size: number) => {
    const temp = left
    left = left + size

    return `${temp}px`
  }
}
