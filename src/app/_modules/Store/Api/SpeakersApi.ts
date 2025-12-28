import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {ENTITY_NAME_LABEL} from "@/app/_modules/Constants/Translations/EntityNameLabel";
import {ENTITY_NAME} from "@/app/_modules/Constants/EntityName";
import {ENTITY_CATEGORY_NAME_LABEL} from "@/app/_modules/Constants";
import {ENTITY_CATEGORY_NAME} from "@/app/_modules/Constants/EntityCategoryName";

type ApiEntityType = SpeakerFromCatalogue;
const entityCategoryName = ENTITY_CATEGORY_NAME.SPEAKERS;
const entityLabel = ENTITY_NAME_LABEL[ENTITY_NAME.SPEAKER];
const entityCategoryLabel = ENTITY_CATEGORY_NAME_LABEL[ENTITY_CATEGORY_NAME.SPEAKERS];
const baseUrl = '/api';
const reducerPath = entityCategoryName;
const basePath = `entities/${entityCategoryName}`;
const tags = [entityCategoryName];

export const speakersApi = createApi({
  reducerPath: reducerPath,
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: tags,
  endpoints: (build) => ({
    getAllSpeakers: build
      .query<ApiEntityType[], void>({
        query: () => basePath,
        providesTags: tags,
        transformErrorResponse: (response) => {
          toaster.create({
            title: `Не удалось загрузить ${entityCategoryLabel}`,
            type: "error",
          })

          return response.status
        },
      }),
    getSpeakerById: build
      .query<ApiEntityType, ApiEntityType['id']>({
        query: (id) => `${basePath}/${id}`,
        providesTags: tags,
        transformErrorResponse: (response) => {
          toaster.create({
            title: `Не удалось загрузить ${entityLabel}`,
            type: "error",
          })

          return response.status
        },
      }),
    createSpeakers: build
      .mutation<ApiEntityType, Omit<ApiEntityType, 'id'>>({
        query: (body) => ({
          url: basePath,
          method: 'POST',
          body: body,
        }),
        invalidatesTags: tags,
        transformResponse: (response: ApiEntityType) => {
          toaster.create({
            title: `${entityLabel} успешно создан`,
            type: "success",
          })

          return response
        },
        transformErrorResponse: (response) => {
          toaster.create({
            title: `Не удалось создать ${entityLabel}`,
            type: "error",
          })

          return response
        },
      }),
    updateSpeakers: build
      .mutation<ApiEntityType, ApiEntityType>({
        query: ({ id, ...body }) => ({
          url: `${basePath}/${id}`,
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: tags,
        transformResponse: (response: ApiEntityType) => {
          toaster.create({
            title: `${entityLabel} успешно обновлён`,
            type: "success",
          })

          return  response
        },
        transformErrorResponse: (response) => {
          toaster.create({
            title: `Не удалось обновить ${entityLabel}`,
            type: "error",
          })

          return response.status
        },
      }),
    deleteSpeakers: build
      .mutation<ApiEntityType, ApiEntityType['id']>({
        query: (id) => ({
          url: `${basePath}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: tags,
        transformResponse: (response: ApiEntityType) => {
          toaster.create({
            title: `${entityLabel} успешно удалён`,
            type: "success",
          })

          return  response
        },
        transformErrorResponse: (response) => {
          toaster.create({
            title: `Не удалось удалить ${entityLabel}`,
            type: "error",
          })

          return response
        },
      }),
  }),
})

export const {
  useGetAllSpeakersQuery,
  useCreateSpeakersMutation,
  useUpdateSpeakersMutation,
  useDeleteSpeakersMutation,
} = speakersApi
