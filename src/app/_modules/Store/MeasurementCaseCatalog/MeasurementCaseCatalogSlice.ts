import {createSlice} from '@reduxjs/toolkit';
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {LegendColors} from "@/app/_modules/Constants";

interface MeasurementCaseCatalogSlice {
  mainMeasurementCaseCollection: MeasurementCaseFromCatalogue[]
  selectedMeasurementCaseCollection: MeasurementCaseFromCatalogue[]
  colorCollection: Record<number, LegendColors>
}

const initialState: MeasurementCaseCatalogSlice = {
  mainMeasurementCaseCollection: [],
  selectedMeasurementCaseCollection: [],
  colorCollection: {}
};

export const measurementCaseCatalogSlice = createSlice({
  name: 'measurementCaseCatalog',
  initialState,
  reducers: {
    setMainMeasurementCaseCollection: (
      state,
      {payload}: {payload: MeasurementCaseCatalogSlice['mainMeasurementCaseCollection']}
    ) => {
      state.mainMeasurementCaseCollection = payload;
    },
    eraseMainMeasurementCaseCollection: (state) => {
      state.mainMeasurementCaseCollection = initialState.mainMeasurementCaseCollection;
    },
    setSelectedMeasurementCaseCollection: (
      state,
      {payload}: {payload: MeasurementCaseCatalogSlice['selectedMeasurementCaseCollection']}
    ) => {
      state.selectedMeasurementCaseCollection = payload;
    },
    eraseSelectedMeasurementCaseCollection: (state) => {
      state.selectedMeasurementCaseCollection = initialState.selectedMeasurementCaseCollection;
    },
    setColorCollection: (
      state,
      {payload}: {payload: MeasurementCaseCatalogSlice['colorCollection']}
    ) => {
      state.colorCollection = payload;
    },
    eraseColorCollection: (state) => {
      state.colorCollection = initialState.colorCollection;
    },
  },
});

export const {
  setMainMeasurementCaseCollection,
  eraseMainMeasurementCaseCollection,
  setSelectedMeasurementCaseCollection,
  eraseSelectedMeasurementCaseCollection,
  setColorCollection,
  eraseColorCollection,
} = measurementCaseCatalogSlice.actions
