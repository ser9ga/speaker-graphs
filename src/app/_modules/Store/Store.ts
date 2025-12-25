import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {graphDataSlice} from '@/app/_modules/Store/GraphData/GraphDataSlice';
import {graphSetControlSlice} from '@/app/_modules/Store/GraphSetControl/GraphSetControlSlice';
import {appControlSlice} from '@/app/_modules/Store/AppControl/AppControlSlice';
import {measurementCaseCatalogSlice} from "@/app/_modules/Store/MeasurementCaseCatalog/MeasurementCaseCatalogSlice";

const rootReducer = combineSlices({
  [appControlSlice.name]: appControlSlice.reducer,
  [graphSetControlSlice.name]: graphSetControlSlice.reducer,
  [graphDataSlice.name]: graphDataSlice.reducer,
  [measurementCaseCatalogSlice.name]: measurementCaseCatalogSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
