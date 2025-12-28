import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {CABINETS_ENTITIES_FIELD_NAME, CABINETS_FIELD_LABEL} from "@/app/_modules/Constants";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";
import {
  useCreateCabinetsMutation,
  useDeleteCabinetsMutation,
  useGetAllCabinetsQuery,
  useUpdateCabinetsMutation
} from "@/app/_modules/Store/Api/CabinetsApi";
import {CabinetFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

type ApiEntityType = CabinetFromCatalogue;

export const CabinetsEntityTable = () => {
  const {data: entities, isLoading: isGetAllLoading} = useGetAllCabinetsQuery();
  const [createEntities] = useCreateCabinetsMutation();
  const [updateEntities] = useUpdateCabinetsMutation();
  const [deleteEntities] = useDeleteCabinetsMutation();

  const onEntityAdd = async (
    values: Omit<ApiEntityType, 'id'>,
    callback?: () => void
  ) => {
    await createEntities(values);
    callback?.();
  }

  const onEntityEdit = async (
    values: ApiEntityType,
    callback?: () => void
  ) => {
    await updateEntities(values);
    callback?.();
  }

  const onEntityDelete = async (
    id: ApiEntityType['id'],
    callback?: () => void
  ) => {
    await deleteEntities(id);
    callback?.();
  }

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
      entities={entities}
      onEntityAdd={onEntityAdd}
      onEntityEdit={onEntityEdit}
      onEntityDelete={onEntityDelete}
      isLoading={isGetAllLoading}
    />
  )
}
