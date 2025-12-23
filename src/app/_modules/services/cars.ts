import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CarFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const cars = serviceFabric<CarFromCatalogue>(
  '/api/entities/cars',
  'автомобиль'
);
