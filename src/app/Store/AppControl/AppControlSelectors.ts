import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {DISPLAYED_GRAPH} from '@/app/Constants/DisplayedGraph';
import {appControlDomainSelector} from "@/app/Store/AppControl/AppControlDomainSelector";

export const isCleanLookEnabledSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({isCleanLookEnabled}) => isCleanLookEnabled
)

export const isGraphExpandedSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({currentDisplayedGraph}) => currentDisplayedGraph !== DISPLAYED_GRAPH.ALL
)

export const verticalScaleOptionSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({verticalScaleOption}) => verticalScaleOption
)

export const horizontalScaleOptionSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({horizontalScaleOption}) => horizontalScaleOption
)

export const currentDisplayedGraphSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({currentDisplayedGraph}) => currentDisplayedGraph
)

export const isFileChooseModalOpenedSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({isFileChooseModalOpened}) => isFileChooseModalOpened
)

export const currentMouseOnGraphSelector = createDraftSafeSelector(
  appControlDomainSelector,
  (state) => state?.currentMouseOnGraph
)
