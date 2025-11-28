import {serviceFabric} from "@/app/_modules/services/serviceFabric";
import {PortFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

export const ports = serviceFabric<PortFromDataBase>('ports');
