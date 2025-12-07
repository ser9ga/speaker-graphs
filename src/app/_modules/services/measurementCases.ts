import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {MeasurementCaseFromDataBase, SpeakerFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const measurementCases = serviceFabric<MeasurementCaseFromDataBase>(
  'measurementCases',
  'случай измерения'
);
