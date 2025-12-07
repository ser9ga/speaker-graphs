import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {SpeakerFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const speakers = serviceFabric<SpeakerFromDataBase>(
  '/entities/speakers',
  'динамик'
);
