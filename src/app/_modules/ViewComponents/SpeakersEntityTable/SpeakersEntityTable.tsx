import * as React from "react";
import {EntityTable} from "@/app/_modules/ViewComponents/EntityTable/EntityTable";
import {SPEAKERS_ENTITIES_FIELD_NAME, SPEAKERS_FIELD_LABEL} from "@/app/_modules/Constants";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";
import {
  useCreateSpeakersMutation,
  useDeleteSpeakersMutation,
  useGetAllSpeakersQuery,
  useUpdateSpeakersMutation
} from "@/app/_modules/Store/Api/SpeakersApi";
import {SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

type ApiEntityType = SpeakerFromCatalogue;

export const SpeakersEntityTable = () => {
  const {data: entities, isLoading: isGetAllLoading} = useGetAllSpeakersQuery();
  const [createEntities] = useCreateSpeakersMutation();
  const [updateEntities] = useUpdateSpeakersMutation();
  const [deleteEntities] = useDeleteSpeakersMutation();

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
      dialogNamePrefix={ENTITY_NAME.SPEAKER}
      columns={[
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.ID,
          width: 60,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.ID]
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.LABEL,
          width: 400,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.LABEL],
          fieldType: 'text',
          required: true
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.SIZE,
          width: 150,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.SIZE],
          fieldType: 'decimal',
          suffix: 'дюймов',
          required: true
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.COIL_RESISTANCE,
          width: 150,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.COIL_RESISTANCE],
          fieldType: 'decimal',
          suffix: 'ом',
          required: true
        },
        {
          keyName: SPEAKERS_ENTITIES_FIELD_NAME.DESCRIPTION,
          label: SPEAKERS_FIELD_LABEL[SPEAKERS_ENTITIES_FIELD_NAME.DESCRIPTION],
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
