import {valueof} from "@/app/_modules/Types/TypeUtils";
import {
  MEASUREMENT_CASE_TABLE_COLUMN_NAME,
  MeasurementCaseTableColumnName
} from "@/app/_modules/Constants/MeasurementCaseTableColumnName";
import {PiCar, PiCompassTool, PiSpeakerNone} from "react-icons/pi";
import * as React from "react";
import {TbCircuitResistor, TbCircuitVoltmeter, TbFileDescription, TbRulerMeasure} from "react-icons/tb";
import {IoCompassOutline} from "react-icons/io5";
import {MdOutlineColorLens} from "react-icons/md";
import {LuDiameter} from "react-icons/lu";
import {RiSpeaker2Line} from "react-icons/ri";
import {GiCarDoor} from "react-icons/gi";

const size = 20

export const MEASUREMENT_CASE_TABLE_COLUMN_ICON: {
  [K in MeasurementCaseTableColumnName]: React.ReactNode
} = {
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.ID]: <IoCompassOutline size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.COLOR]: <MdOutlineColorLens size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_LABEL]: <PiSpeakerNone size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_COIL_RESISTANCE]: <TbCircuitResistor size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.SPEAKER_SIZE]: <PiCompassTool size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.CABINET_VOLUME]: <RiSpeaker2Line size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_DIAMETER]: <LuDiameter size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.PORT_LENGTH]: <TbRulerMeasure size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.CAR_LABEL]: <PiCar size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.VOLTAGE_OF_TESTING]: <TbCircuitVoltmeter size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED]: <GiCarDoor size={size}/>,
  [MEASUREMENT_CASE_TABLE_COLUMN_NAME.DESCRIPTION]: <TbFileDescription size={size}/>,
} as const;

export type MeasurementCaseTableColumnIcon = valueof<typeof MEASUREMENT_CASE_TABLE_COLUMN_ICON>;
