import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CabinetFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const cabinets = serviceFabric<CabinetFromCatalogue>(
  '/api/entities/cabinets',
  'короб'
  );
