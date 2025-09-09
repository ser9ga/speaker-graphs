export type CoilMethodFromDataBase = "serial" | "parallel"

export interface SpeakerFromDataBase {
  id: number
  label: string
  coil: {
    resistance: number
    isDouble: boolean
    method: CoilMethodFromDataBase
  }
  description: string
}

export interface CabinetFromDataBase {
  id: number
  label: string
  description: string
}

export interface PortFromDataBase {
  id: number
  diameter: number
  length: number
  description: string
}

export interface CarFromDataBase {
  id: number
  label: number
  description: string
}

export type DoorStateFromDataBase = boolean

export type VoltageOfTestingFromDataBase = number

export interface MeasureFrameFromDataBase {
  Uin: number | null
  I: number | null
  Pa: number | null
}

export type MeasureDataFromDataBase = Record<number, MeasureFrameFromDataBase>

export interface MeasurementCaseFromDataBase {
  meta: {
    id: number
    speakerId: number
    cabinetId: number
    carId: number
    isDoorOpened: boolean
    voltageOfTesting: number
    description: string
  }
  data: MeasureDataFromDataBase
}
