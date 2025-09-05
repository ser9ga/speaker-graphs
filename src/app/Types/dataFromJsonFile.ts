export interface DataFromJsonFile {
  meta: {
    id: number | null
    speaker: {
      id: number | null
      label: string
      coil: {
        resistance: number
        isDouble: boolean
        method: "serial" | "parallel"
      }
    }
    cabinet: {
      id: number | null
      label: string
    }
    port: {
      id: number | null
      diameter: number
      length: number
    }
    car: {
      id: number | null
      label: string
    }
    isDoorOpened: boolean
    voltageOfTesting: number
  }
  data: Record<number, {
    Uin: number | null
    I: number | null
    Pa: number | null
    // P: number | null
    // Z: number | null
    // S: number | null
    // PaUout: number | null
    // PPamax: number | null
  }>
}
