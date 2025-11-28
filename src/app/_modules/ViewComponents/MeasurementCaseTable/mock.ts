import {MeasurementCaseFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const MockData: MeasurementCaseFromDataBase[] = [
  {
    id: 1,
    meta: {
      speakerId: 1,
      cabinetId: 1,
      portId: 1,
      carId: 1,
      isDoorOpened: false,
      voltageOfTesting: 20,
      description: 'Описание'
    },
    data: []
  }
]
