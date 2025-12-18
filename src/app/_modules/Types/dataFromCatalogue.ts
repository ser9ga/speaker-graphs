import {NulledRecord} from "@/app/_modules/Types/TypeUtils";

export interface SpeakerFromCatalogue {
  id: number
  label: string
  coilResistance: number
  description: string | null
}

export interface CabinetFromCatalogue {
  id: number
  volume: number
  speakerSize: number
  description: string | null
}

export interface PortFromCatalogue {
  id: number
  diameter: number
  length: number
  description: string | null
}

export interface CarFromCatalogue {
  id: number
  label: string
  description: string | null
}

export interface FilledMeasurementFrameFromCatalogue {
  Uin: number
  I: number
  Pa: number
}

export interface EmptyMeasurementFrameFromCatalogue {
  Uin: null
  I: null
  Pa: null
}

export type MeasurementFrameFromCatalogue =
  | FilledMeasurementFrameFromCatalogue
  | EmptyMeasurementFrameFromCatalogue

export interface MeasurementCaseFromCatalogue {
  id: number
  meta: {
    speaker: SpeakerFromCatalogue
    cabinet: CabinetFromCatalogue
    port: PortFromCatalogue
    car: CarFromCatalogue
    isDoorOpened: boolean
    voltageOfTesting: number
    description: string | null
  }
  data: Record<number, MeasurementFrameFromCatalogue>
}

export interface EmptyMeasurementCaseFromCatalogue {
  meta: NulledRecord<MeasurementCaseFromCatalogue['meta']>
  data: Record<number, EmptyMeasurementFrameFromCatalogue>
}
