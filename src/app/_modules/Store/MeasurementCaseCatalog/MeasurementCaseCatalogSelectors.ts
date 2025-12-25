import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {
  measurementCaseCatalogDomainSelector
} from "@/app/_modules/Store/MeasurementCaseCatalog/MeasurementCaseCatalogDomainSelector";

export const measurementCaseCatalogSelector = createDraftSafeSelector(
  measurementCaseCatalogDomainSelector,
  ({mainMeasurementCaseCollection}) => mainMeasurementCaseCollection
)

export const selectedMeasurementCaseCollectionSelector = createDraftSafeSelector(
  measurementCaseCatalogDomainSelector,
  ({selectedMeasurementCaseCollection}) => selectedMeasurementCaseCollection
)

export const colorCollectionSelector = createDraftSafeSelector(
  measurementCaseCatalogDomainSelector,
  ({colorCollection}) => colorCollection
)
