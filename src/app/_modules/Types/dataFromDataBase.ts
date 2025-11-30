export type SpeakerIdFromDataBase = number

export interface SpeakerFromDataBase {
  id: SpeakerIdFromDataBase
  label: string
  coilResistance: number
  description: string | null
}

export type CabinetIdFromDataBase = number

export interface CabinetFromDataBase {
  id: CabinetIdFromDataBase
  volume: number
  speakerSize: number
  description: string | null
}

export type PortIdFromDataBase = number

export interface PortFromDataBase {
  id: PortIdFromDataBase
  diameter: number
  length: number
  description: string | null
}

export type CarIdFromDataBase = number

export interface CarFromDataBase {
  id: CarIdFromDataBase
  label: string
  description: string | null
}

export type DoorStateFromDataBase = boolean

export type VoltageOfTestingFromDataBase = number

export interface MeasurementFrameFromDataBase {
  Uin: number | null
  I: number | null
  Pa: number | null
}

export type MeasurementDataFromDataBase = Record<number, MeasurementFrameFromDataBase>

export type MeasurementCaseIdFromDataBase = number

export interface MeasurementCaseFromDataBase {
  id: MeasurementCaseIdFromDataBase
  meta: {
    speakerId: SpeakerIdFromDataBase
    cabinetId: CabinetIdFromDataBase
    portId: PortIdFromDataBase
    carId: CarIdFromDataBase
    isDoorOpened: DoorStateFromDataBase
    voltageOfTesting: VoltageOfTestingFromDataBase
    description: string | null
  }
  data: MeasurementDataFromDataBase
}
