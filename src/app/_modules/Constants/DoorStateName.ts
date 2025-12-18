import {valueof} from "@/app/_modules/Types/TypeUtils";

export const DOOR_STATE_NAME =  {
  OPENED: 'opened',
  CLOSED: 'closed',
} as const

export type DoorStateName = valueof<typeof DOOR_STATE_NAME>
