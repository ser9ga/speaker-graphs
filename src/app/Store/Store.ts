import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { graphDataSlice } from '@/app/Store/GraphData/GraphDataSlice';
import { appControlSlice } from '@/app/Store/AppControl/AppControlSlice';

const rootReducer = combineSlices({
  [appControlSlice.name]: appControlSlice.reducer,
  [graphDataSlice.name]: graphDataSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
