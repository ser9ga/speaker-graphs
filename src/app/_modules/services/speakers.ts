import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const speakers = serviceFabric<SpeakerFromCatalogue>(
  '/entities/speakers',
  'динамик'
);
