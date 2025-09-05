import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store/Store';
import { DISPLAYED_GRAPH } from '@/app/Constants/DisplayedGraph';

export const appControlDomainSelector = (state: RootState) => state.appControl


export const isCleanLookEnabledSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.isCleanLookEnabled
)

export const isGraphExpandedSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.currentDisplayedGraph !== DISPLAYED_GRAPH.ALL
)

export const verticalScaleOptionSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.verticalScaleOption
)

export const horizontalScaleOptionSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.horizontalScaleOption
)

export const currentDisplayedGraphSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.currentDisplayedGraph
)

export const isFileChooseModalOpenedSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (appControlState) => appControlState.isFileChooseModalOpened
)

