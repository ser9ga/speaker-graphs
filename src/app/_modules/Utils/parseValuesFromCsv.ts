export const parseValuesFromCsv = (rawString: string) => {
  const splitStrings = rawString
    .split('\r\n')
    .map(row => row.split(';'))

  const metaRow = splitStrings?.[1];
  const dataRows = splitStrings?.slice?.(3);

  return {
    maybeSpeaker: metaRow?.[0],
    maybeCabinet: metaRow?.[1],
    maybePortDiameter: metaRow?.[2],
    maybePortLength: metaRow?.[3],
    maybeCar: metaRow?.[4],
    maybeDoorSate: metaRow?.[5],
    maybeVoltageOfTesting: metaRow?.[6],
    dataRows
  }
}
