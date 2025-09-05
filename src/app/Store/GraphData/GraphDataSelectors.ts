import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/Store/Store';
import { MeasurementUnitWithUniqName } from '@/app/Types/GraphDataTypes';
import { UNIT, Unit } from '@/app/Constants/Unit';
import { calculateAndPackUnitData } from '@/app/Utils/calculateAndPackUnitData/calculateAndPackUnitData';

export const graphDataDomainSelector = (state: RootState) => state.graphData;

export const measurementMetasSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (graphDataState): MeasurementUnitWithUniqName[] | null => graphDataState
    .graphDataCollection?.map(
      (graphDataItem) => ({
        ...graphDataItem.measurementMeta,
        uniqName: graphDataItem.uniqName,
      })
  ) || null
);

export const getIsLineVisibleSelector = (uniqName: string) => {
  return createDraftSafeSelector(
    graphDataDomainSelector,
    (graphDataState) => graphDataState
      .graphDataCollection?.find(
        (graphDataItem) => graphDataItem.uniqName === uniqName
      )?.graphOptions.isVisible
  ) || null;
};

export const getLineColorSelector = (uniqName: string) => {
  return createDraftSafeSelector(
    graphDataDomainSelector,
    (graphDataState) => graphDataState
      .graphDataCollection?.find(
        (graphDataItem) => graphDataItem.uniqName === uniqName
      )?.graphOptions.strokeColor
  ) || null;
};


export const getUnitDataByUnitName = (unit: Unit) => {
  return createDraftSafeSelector(
    (state: RootState) => state.appControl,
    (state: RootState) => state.graphData,
    (appControl, graphData) => {
      return calculateAndPackUnitData(
        graphData.graphDataCollection,
        unit,
        unit === UNIT.PaUout
          ? {substitutedVoltageOfTesting: appControl.substitutedVoltageOfTesting}
          : undefined
      ) || []
    }
  )
};
