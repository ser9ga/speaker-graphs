import * as React from "react";
import {services} from "@/app/_modules/services";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {CABINETS_ENTITIES_FIELD_NAME, CABINETS_FIELD_LABEL} from "@/app/_modules/Constants";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";

export const CabinetsEntityTable = () => {
  return (
    <EntityTable
      dialogNamePrefix={ENTITY_NAME.CABINET}
      columns={[
        {
          keyName: CABINETS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: CABINETS_FIELD_LABEL[CABINETS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: CABINETS_ENTITIES_FIELD_NAME.SPEAKER_SIZE,
          width: 150,
          label: CABINETS_FIELD_LABEL[CABINETS_ENTITIES_FIELD_NAME.SPEAKER_SIZE],
          fieldType: 'decimal',
          suffix: 'дюймов',
          required: true
        },
        {
          keyName: CABINETS_ENTITIES_FIELD_NAME.VOLUME,
          width: 150,
          label: CABINETS_FIELD_LABEL[CABINETS_ENTITIES_FIELD_NAME.VOLUME],
          fieldType: 'decimal',
          suffix: 'литров',
          required: true
        },
        {
          keyName: CABINETS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: CABINETS_FIELD_LABEL[CABINETS_ENTITIES_FIELD_NAME.DESCRIPTION],
          fieldType: 'textArea'
        },
      ]}
      entityService={services.cabinets}
    />
  )
}
