import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '@/app/_modules/Store/Store';
import {MeasurementUnitWithUniqName} from '@/app/_modules/Types/GraphDataTypes';
import {UNIT, Unit} from '@/app/_modules/Constants/Unit';
import {calculateAndPackUnitData} from '@/app/_modules/Utils/calculateAndPackUnitData/calculateAndPackUnitData';
import {graphDataDomainSelector} from "@/app/_modules/Store/GraphData/GraphDataDomainSelector";
import {appControlDomainSelector} from "@/app/_modules/Store/AppControl/AppControlDomainSelector";

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

export const getIsLineVisibleSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (_: RootState, uniqName: string ) => uniqName,
  (graphDataState, uniqName) => graphDataState
    .graphDataCollection?.find(
      (graphDataItem) => graphDataItem.uniqName === uniqName
    )?.graphOptions.isVisible
) || null;

export const getLineColorSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (_: RootState, uniqName: string ) => uniqName,
  (graphDataState, uniqName) => graphDataState
    .graphDataCollection?.find(
      (graphDataItem) => graphDataItem.uniqName === uniqName
    )?.graphOptions.strokeColor
) || null;

export const substitutedVoltageOfTesting = createDraftSafeSelector(
  appControlDomainSelector,
  ({substitutedVoltageOfTesting}) => substitutedVoltageOfTesting
)

export const getUnitDataByUnitName = createDraftSafeSelector(
  substitutedVoltageOfTesting,
  (state: RootState) => state.graphData,
  (_: RootState, unit: Unit) => unit,
  (substitutedVoltageOfTesting, graphData, unit) => {
    return calculateAndPackUnitData(
      graphData.graphDataCollection,
      unit,
      unit === UNIT.PaUout
        ? {substitutedVoltageOfTesting}
        : undefined
    ) || []
  }
)
