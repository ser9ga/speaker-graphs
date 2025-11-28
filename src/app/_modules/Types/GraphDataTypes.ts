import { MeasuredUnit } from '@/app/_modules/Constants/MeasuredUnit';

export type MeasurementFrame = Record<MeasuredUnit, number | string | null>

export interface MeasurementMeta {
  speakerLabel: string
  cabinetLabel: string
  portDiameter: number
  portLength: number
  carLabel: string
  voltageOfTesting: number
  isDoorOpened: boolean
}

export interface MeasurementUnitWithUniqName extends MeasurementMeta {
  uniqName: string
}

export interface GraphOptionSet {
  strokeColor: string
  isVisible: boolean
  isCompensationEnabled: boolean
}

export type GraphData = Record<number, MeasurementFrame>

export interface StoreGraphDataItem {
  uniqName: string
  measurementMeta: MeasurementMeta
  graphOptions: GraphOptionSet
  graphData: GraphData
}

export type MeasurementCaseJSONFile = {
  meta: MeasurementMeta
  data: MeasurementFrame
}[]
