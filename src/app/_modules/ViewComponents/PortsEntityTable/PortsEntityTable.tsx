import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {PORTS_ENTITIES_FIELD_NAME, PORTS_FIELD_LABEL} from "@/app/_modules/Constants";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";
import {
  useCreatePortsMutation,
  useDeletePortsMutation,
  useGetAllPortsQuery,
  useUpdatePortsMutation
} from "@/app/_modules/Store/Api/PortsApi";
import {PortFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

type ApiEntityType = PortFromCatalogue;

export const PortsEntityTable = () => {
  const {data: entities, isLoading: isGetAllLoading} = useGetAllPortsQuery();
  const [createEntities] = useCreatePortsMutation();
  const [updateEntities] = useUpdatePortsMutation();
  const [deleteEntities] = useDeletePortsMutation();

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
      dialogNamePrefix={ENTITY_NAME.PORT}
      columns={[
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.DIAMETER,
          width: 150,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.DIAMETER],
          fieldType: 'decimal',
          suffix: 'миллиметров',
          required: true
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.LENGTH,
          width: 150,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.LENGTH],
          fieldType: 'decimal',
          suffix: 'сантиметров',
          required: true
        },
        {
          keyName: PORTS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: PORTS_FIELD_LABEL[PORTS_ENTITIES_FIELD_NAME.DESCRIPTION],
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
