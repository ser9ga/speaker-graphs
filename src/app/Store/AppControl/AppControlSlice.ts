import { createSlice } from '@reduxjs/toolkit';
import { DISPLAYED_GRAPH, DisplayedGraph } from '@/app/Constants/DisplayedGraph';
import { VERTICAL_SCALE_OPTION, VerticalScaleOption } from '@/app/Constants/VerticalScaleOption';
import { HORIZONTAL_SCALE_OPTION, HorizontalScaleOption } from '@/app/Constants/HorizontalScaleOption';

interface AppControlSlice {
  currentDisplayedGraph: DisplayedGraph
  verticalScaleOption: VerticalScaleOption
  horizontalScaleOption: HorizontalScaleOption
  substitutedVoltageOfTesting: number | null
  isCleanLookEnabled: boolean
  isResistantCompensationEnabled: boolean
  isFileChooseModalOpened: boolean
}

const initialState: AppControlSlice = {
  currentDisplayedGraph: DISPLAYED_GRAPH.ALL,
  verticalScaleOption: VERTICAL_SCALE_OPTION.ZOOMED,
  substitutedVoltageOfTesting: null,
  horizontalScaleOption: HORIZONTAL_SCALE_OPTION.FULL,
  isCleanLookEnabled: false,
  isResistantCompensationEnabled: false,
  isFileChooseModalOpened: false,
};

export const appControlSlice = createSlice({
  name: 'appControl',
  initialState,
  reducers: {
    setCurrentDisplayedGraph: (
      state,
      {payload}: {payload: DisplayedGraph}
    ) => {
      state.currentDisplayedGraph = payload;
    },
    toggleGraphExpansion: (
      state,
      {payload}: {payload: DisplayedGraph}
    ) => {
      if(state.currentDisplayedGraph === payload) {
        state.currentDisplayedGraph = DISPLAYED_GRAPH.ALL

        return;
      }

      state.currentDisplayedGraph = payload
    },
    toggleVerticalScaleOption: (state) => {
      if(state.verticalScaleOption === VERTICAL_SCALE_OPTION.ZOOMED) {
        state.verticalScaleOption = VERTICAL_SCALE_OPTION.FULL

        return;
      }

      if(state.verticalScaleOption === VERTICAL_SCALE_OPTION.FULL) {
        state.verticalScaleOption = VERTICAL_SCALE_OPTION.ZOOMED

        return;
      }
    },
    toggleHorizontalScaleOption: (state) => {
      if(state.horizontalScaleOption === HORIZONTAL_SCALE_OPTION.ZOOMED) {
        state.horizontalScaleOption = HORIZONTAL_SCALE_OPTION.FULL

        return;
      }

      if( state.horizontalScaleOption === HORIZONTAL_SCALE_OPTION.FULL) {
        state.horizontalScaleOption = HORIZONTAL_SCALE_OPTION.ZOOMED

        return;
      }
    },
    toggleCleanLook: (state) => {
      state.isCleanLookEnabled = !state.isCleanLookEnabled;
    },
    toggleResistantCompensation: (state) => {
      state.isResistantCompensationEnabled = !state.isResistantCompensationEnabled;
    },
    setSubstitutedVoltageOfTesting: (
      state,
      {payload}: {payload: number}
    ) => {
      state.substitutedVoltageOfTesting = payload;
    },
    eraseSubstitutedVoltageOfTesting: (state) => {
      state.substitutedVoltageOfTesting = initialState.substitutedVoltageOfTesting;
    },
    setFileChooseModalOpened: (
      state,
      {payload}: {payload: boolean}
    ) => {
      state.isFileChooseModalOpened = payload;
    },
  },
});


export const {
  setCurrentDisplayedGraph,
  toggleGraphExpansion,
  toggleVerticalScaleOption,
  toggleHorizontalScaleOption,
  toggleCleanLook,
  toggleResistantCompensation,
  setFileChooseModalOpened
} = appControlSlice.actions

