import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {DISPLAYED_GRAPH} from '@/app/_modules/Constants/DisplayedGraph';
import {graphSetControlDomainSelector} from "@/app/_modules/Store/GraphSetControl/GraphSetControlDomainSelector";

export const isCleanLookEnabledSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  ({isCleanLookEnabled}) => isCleanLookEnabled
)

export const isGraphExpandedSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  ({currentDisplayedGraph}) => currentDisplayedGraph !== DISPLAYED_GRAPH.ALL
)

export const verticalScaleOptionSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  ({verticalScaleOption}) => verticalScaleOption
)

export const horizontalScaleOptionSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  ({horizontalScaleOption}) => horizontalScaleOption
)

export const currentDisplayedGraphSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  ({currentDisplayedGraph}) => currentDisplayedGraph
)

export const currentMouseOnGraphSelector = createDraftSafeSelector(
  graphSetControlDomainSelector,
  (state) => state?.currentMouseOnGraph
)
