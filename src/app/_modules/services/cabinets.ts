import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CabinetFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const cabinets = serviceFabric<CabinetFromCatalogue>(
  '/entities/cabinets',
  'короб'
  );
