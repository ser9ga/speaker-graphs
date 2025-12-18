import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {appControlDomainSelector} from "@/app/_modules/Store/AppControl/AppControlDomainSelector";

export const activeTabSelector = createDraftSafeSelector(
  appControlDomainSelector,
  ({activeTab}) => activeTab
)
