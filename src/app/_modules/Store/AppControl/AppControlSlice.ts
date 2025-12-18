import {createSlice} from '@reduxjs/toolkit';
import {MAIN_TAB_NAME, MainTabName} from "@/app/_modules/Constants";

interface AppControlSlice {
  activeTab: MainTabName
}

const initialState: AppControlSlice = {
  activeTab: MAIN_TAB_NAME.GRAPH_DRAWS,
};

export const appControlSlice = createSlice({
  name: 'appControl',
  initialState,
  reducers: {
    setActiveTab: (
      state,
      {payload}: {payload: AppControlSlice['activeTab']}
    ) => {
      state.activeTab = payload;
    },
  },
});

export const {
  setActiveTab,
} = appControlSlice.actions
