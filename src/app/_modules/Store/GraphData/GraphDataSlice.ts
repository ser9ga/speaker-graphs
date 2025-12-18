import { createSlice } from '@reduxjs/toolkit';
import { MeasurementCaseForGraph } from '@/app/_modules/Types/dataForGraphs';

interface GraphDataState {
  graphDataCollection: MeasurementCaseForGraph[] | null;
}

const initialState: GraphDataState = {
  graphDataCollection: null,
};

export const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    setGraphData: (
      state,
      {payload}: {payload: MeasurementCaseForGraph[]}
    ) => {
      state.graphDataCollection = payload;
    },
    changeVisibilityOfCase: (
      state,
      {payload}: {payload: {
        targetGraphName: MeasurementCaseForGraph['id'],
        flag: boolean,
      }}
    ) => {
      state.graphDataCollection = state.graphDataCollection
        ?.map((graphDataItem) => {
          if (graphDataItem.id !== payload.targetGraphName) {
            return graphDataItem
          }

          return {
            ...graphDataItem,
            options: {
              ...graphDataItem.options,
              isVisible: payload.flag
            }
          };
        }) || null;
    },
  },
})

export const {
  setGraphData,
  changeVisibilityOfCase
} = graphDataSlice.actions
