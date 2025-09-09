import {MeasurementCaseFromDataBase} from "@/app/Types/dataFromDataBase";

export const MockData: MeasurementCaseFromDataBase[] = [
  {
    meta: {
      id: 1,
      speakerId: 1,
      cabinetId: 1,
      carId: 1,
      isDoorOpened: false,
      voltageOfTesting: 20,
      description: 'Описание'
    },
    data: []
  }
]
