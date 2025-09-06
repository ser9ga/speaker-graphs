import {GraphDataItem} from "@/app/Types/Types";

export const getFilteredNotEmptyUnitData = (initialData: GraphDataItem[]) => initialData
  .filter((frequencyValues) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {argument, ...rest} = frequencyValues;

  return Object.values(rest).some(value => value !== null);
})
