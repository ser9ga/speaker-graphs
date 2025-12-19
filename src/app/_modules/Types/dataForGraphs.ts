import {MeasurementCaseFromCatalogue, MeasurementFrameFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {NullableRecord} from "@/app/_modules/Types/TypeUtils";

export interface GraphOptions {
  strokeColor: string
  isVisible: boolean
  isCompensationEnabled: boolean
}

export interface MeasurementCaseForGraph extends Omit<MeasurementCaseFromCatalogue, 'id'> {
  id: number | string,
  options: GraphOptions
}

export type MeasurementUnitWithId =  MeasurementCaseForGraph['meta'] & {
  id: MeasurementCaseForGraph['id']
}

export interface EditableMeasurementCaseForGraph {
  id?: number | string,
  meta: NullableRecord<MeasurementCaseForGraph['meta']>
  data: Record<number, MeasurementFrameFromCatalogue>
  // @ts-ignore
  options: NullableRecord<MeasurementCaseForGraph['options']>
}

