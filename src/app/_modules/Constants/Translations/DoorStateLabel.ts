import {valueof} from "@/app/_modules/Types/TypeUtils";
import {DOOR_STATE_NAME} from "@/app/_modules/Constants";

export const DOOR_STATE_LABEL =  {
  [DOOR_STATE_NAME.OPENED]: 'Открыта',
  [DOOR_STATE_NAME.CLOSED]: 'Закрыта',
} as const

export type DoorStateLabel = valueof<typeof DOOR_STATE_LABEL>
