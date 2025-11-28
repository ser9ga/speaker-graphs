import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {ENTITY_CATEGORY} from "@/app/_modules/Constants/EntityCategory";
import {CARS_ENTITIES_FIELD_NAME, CARS_FIELD_LABEL} from "@/app/_modules/Constants";
import {services} from "@/app/_modules/services";

export const CarsEntityTable = () => {
  return (
    <EntityTable
      dialogNamePrefix={ENTITY_CATEGORY.CARS}
      columns={[
        {
          keyName: CARS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: CARS_ENTITIES_FIELD_NAME.LABEL,
          width: 300,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.LABEL]
        },
        {
          keyName: CARS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: CARS_FIELD_LABEL[CARS_ENTITIES_FIELD_NAME.DESCRIPTION]
        },
      ]}
      entityService={services.cars}
    />
  )
}
