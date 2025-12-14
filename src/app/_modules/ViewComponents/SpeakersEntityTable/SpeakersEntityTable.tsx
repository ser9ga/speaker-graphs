import * as React from "react";
import {services} from "@/app/_modules/services";
import {SPEAKERS_ENTITIES_FIELD_NAME, SPEAKERS_FIELD_LABEL} from "@/app/_modules/Constants";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {ENTITY_CATEGORY_NAME} from "@/app/_modules/Constants/EntityCategoryName";

export const SpeakersEntityTable = () => {
  return (
    <EntityTable
      dialogNamePrefix={ENTITY_CATEGORY_NAME.SPEAKERS}
      columns={[
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.LABEL,
          width: 400,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.LABEL]
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.COIL_RESISTANCE,
          width: 150,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.COIL_RESISTANCE]
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.DESCRIPTION]
        },
      ]}
      entityService={services.speakers}
    />
  )
}
