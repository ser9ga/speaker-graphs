import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {graphDataSlice} from '@/app/_modules/Store/GraphData/GraphDataSlice';
import {graphSetControlSlice} from '@/app/_modules/Store/GraphSetControl/GraphSetControlSlice';
import {appControlSlice} from '@/app/_modules/Store/AppControl/AppControlSlice';
import {measurementCaseCatalogSlice} from "@/app/_modules/Store/MeasurementCaseCatalog/MeasurementCaseCatalogSlice";
import {measurementsCasesApi} from "@/app/_modules/Store/Api/MeasurementCasesApi";
import {speakersApi} from "@/app/_modules/Store/Api/SpeakersApi";
import {cabinetsApi} from "@/app/_modules/Store/Api/CabinetsApi";
import {portsApi} from "@/app/_modules/Store/Api/PortsApi";
import {carsApi} from "@/app/_modules/Store/Api/CarsApi";

const rootReducer = combineSlices({
  [appControlSlice.name]: appControlSlice.reducer,
  [graphSetControlSlice.name]: graphSetControlSlice.reducer,
  [graphDataSlice.name]: graphDataSlice.reducer,
  [measurementCaseCatalogSlice.name]: measurementCaseCatalogSlice.reducer,
  [measurementsCasesApi.reducerPath]: measurementsCasesApi.reducer,
  [speakersApi.reducerPath]: speakersApi.reducer,
  [cabinetsApi.reducerPath]: cabinetsApi.reducer,
  [portsApi.reducerPath]: portsApi.reducer,
  [carsApi.reducerPath]: carsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(measurementsCasesApi.middleware)
      .concat(speakersApi.middleware)
      .concat(cabinetsApi.middleware)
      .concat(portsApi.middleware)
      .concat(carsApi.middleware)
  }
})

export const makeStore = () => {
  return store
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
