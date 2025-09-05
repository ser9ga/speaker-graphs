import { createSlice } from '@reduxjs/toolkit';
import { StoreGraphDataItem } from '@/app/Types/GraphDataTypes';

interface GraphDataState {
  graphDataCollection: StoreGraphDataItem[] | null;
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
      {payload}: {payload: StoreGraphDataItem[]}
    ) => {
      state.graphDataCollection = payload;
    },

    addStoreGraphItem: (
      state,
      {payload}: {payload: StoreGraphDataItem}
    ) => {
      if (state.graphDataCollection?.length && state.graphDataCollection?.length >= 6) {
        console.error('graphDataCollection if full');

        return;
      }

        state.graphDataCollection = (state.graphDataCollection || []).concat(payload);
    },
    deleteGraphItem: (
      state,
      {payload}: {payload: string}
    ) => {
      const existencePredicate = state
        state.graphDataCollection
          ?.some((storeGraphDataItem) => storeGraphDataItem.uniqName === payload);

      if (!existencePredicate) {
        console.error(`StoreGraphItem with Id ${payload} is not exist`);

        return;
      }

      state.graphDataCollection = state
        .graphDataCollection?.filter((storeGraphDataItem) => {
          return storeGraphDataItem.uniqName !== payload
        }) || null;
    },
    eraseStoreGraphData: (state) => {
      state.graphDataCollection = initialState.graphDataCollection;
    },
    changeVisibilityOfCase: (
      state,
      {payload}: {payload: {
        targetGraphName: string,
        flag: boolean,
      }}
    ) => {
      state.graphDataCollection = state.graphDataCollection
        ?.map((graphDataItem) => {
          if (graphDataItem.uniqName !== payload.targetGraphName) {
            return graphDataItem
          }

          return {
            ...graphDataItem,
            graphOptions: {
              ...graphDataItem.graphOptions,
              isVisible: payload.flag
            }
          };
        }) || null;
    },
  },
})

export const {
  setGraphData,
  addStoreGraphItem,
  deleteGraphItem,
  eraseStoreGraphData,
  changeVisibilityOfCase
} = graphDataSlice.actions
