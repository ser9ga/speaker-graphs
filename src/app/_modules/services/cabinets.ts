import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CabinetFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const cabinets = serviceFabric<CabinetFromDataBase>(
  '/entities/cabinets',
  'короб'
  );
