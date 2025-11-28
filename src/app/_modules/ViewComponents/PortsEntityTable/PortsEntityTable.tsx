import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {PORTS_ENTITIES_FIELD_NAME, PORTS_FIELD_LABEL} from "@/app/_modules/Constants";
import {services} from "@/app/_modules/services";
import {ENTITY_CATEGORY} from "@/app/_modules/Constants/EntityCategory";

export const PortsEntityTable = () => {
  return (
    <EntityTable
      dialogNamePrefix={ENTITY_CATEGORY.PORTS}
      columns={[
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.DIAMETER,
          width: 150,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.DIAMETER]
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.LENGTH,
          width: 150,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.LENGTH]
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.DESCRIPTION]
        },
      ]}
      entityService={services.ports}
    />
  )
}
