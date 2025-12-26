import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {CARS_ENTITIES_FIELD_NAME, CARS_FIELD_LABEL} from "@/app/_modules/Constants";
import {services} from "@/app/_modules/services";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";

export const CarsEntityTable = () => {
  return (
    <EntityTable
      dialogNamePrefix={ENTITY_NAME.CAR}
      columns={[
        {
          keyName: CARS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: CARS_ENTITIES_FIELD_NAME.LABEL,
          width: 300,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.LABEL],
          required: true
        },
        {
          keyName: CARS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.DESCRIPTION],
          fieldType: 'textArea'
        },
      ]}
      entityService={services.cars}
    />
  )
}
