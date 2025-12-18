import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '@/app/_modules/Store/Store';
import {MeasurementCaseForGraph, MeasurementUnitWithId} from '@/app/_modules/Types/dataForGraphs';
import {UNIT, Unit} from '@/app/_modules/Constants/Unit';
import {calculateAndPackUnitData} from '@/app/_modules/Utils/calculateAndPackUnitData/calculateAndPackUnitData';
import {graphDataDomainSelector} from "@/app/_modules/Store/GraphData/GraphDataDomainSelector";
import {graphSetControlDomainSelector} from "@/app/_modules/Store/GraphSetControl/GraphSetControlDomainSelector";

export const measurementMetasSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (graphDataState): MeasurementUnitWithId[] | null => graphDataState
    .graphDataCollection?.map(
      (graphDataItem) => ({
        id: graphDataItem.id,
        ...graphDataItem.meta,
      })
  ) || null
);

export const getIsLineVisibleSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (_: RootState, id: MeasurementCaseForGraph['id'] ) => id,
  (graphDataState, id) => graphDataState
    .graphDataCollection?.find(
      (graphDataItem) => graphDataItem.id === id
    )?.options.isVisible
) || null;

export const getLineColorSelector = createDraftSafeSelector(
  graphDataDomainSelector,
  (_: RootState, id: MeasurementCaseForGraph['id'] ) => id,
  (graphDataState, id) => graphDataState
    .graphDataCollection?.find(
      (graphDataItem) => graphDataItem.id === id
    )?.options.strokeColor
) || null;

export const substitutedVoltageOfTesting = createDraftSafeSelector(
  graphSetControlDomainSelector,
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
