import {GraphDrawDataItem} from "@/app/_modules/Types/graphDraw";

export const getFilteredNotEmptyUnitData = (initialData: GraphDrawDataItem[]) => initialData
  .filter((frequencyValues) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {argument, ...rest} = frequencyValues;

  return Object.values(rest).some(value => value !== null);
})
