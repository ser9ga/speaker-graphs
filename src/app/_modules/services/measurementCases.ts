import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {MeasurementCaseFromCatalogue, SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const measurementCases = serviceFabric<MeasurementCaseFromCatalogue>(
  'measurementCases',
  'случай измерения'
);
