import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {PortFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const ports = serviceFabric<PortFromCatalogue>(
  '/entities/ports',
  'порт'
);
