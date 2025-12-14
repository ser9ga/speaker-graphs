import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CarFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

export const cars = serviceFabric<CarFromCatalogue>(
  '/entities/cars',
  'автомобиль'
);
