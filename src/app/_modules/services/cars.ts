import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {CarFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const cars = serviceFabric<CarFromDataBase>('cars');
