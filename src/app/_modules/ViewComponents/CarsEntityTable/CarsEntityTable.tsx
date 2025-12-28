import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {CARS_ENTITIES_FIELD_NAME, CARS_FIELD_LABEL} from "@/app/_modules/Constants";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";
import {
  useCreateCarsMutation,
  useDeleteCarsMutation,
  useGetAllCarsQuery,
  useUpdateCarsMutation
} from "@/app/_modules/Store/Api/CarsApi";
import {CarFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

type ApiEntityType = CarFromCatalogue;

export const CarsEntityTable = () => {
  const {data: entities, isLoading: isGetAllLoading} = useGetAllCarsQuery();
  const [createEntities] = useCreateCarsMutation();
  const [updateEntities] = useUpdateCarsMutation();
  const [deleteEntities] = useDeleteCarsMutation();

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
      entities={entities}
      onEntityAdd={onEntityAdd}
      onEntityEdit={onEntityEdit}
      onEntityDelete={onEntityDelete}
      isLoading={isGetAllLoading}
    />
  )
}
