import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {toaster} from "@/app/_modules/components/ui/toaster";

type ApiEntityType = MeasurementCaseFromCatalogue;
const entityCategoryName = 'measurementCases';
const entityLabel = 'Случай Измерения';
const entityCategoryLabel = 'Случаи измерения';
const baseUrl = '/api';
const reducerPath = entityCategoryName;
const basePath = `${entityCategoryName}`;
const tags = [entityCategoryName];

export const measurementsCasesApi = createApi({
  reducerPath: reducerPath,
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: tags,
  endpoints: (build) => ({
    getAllMeasurementsCases: build
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
    getMeasurementsCaseById: build
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
    createMeasurementsCases: build
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
    updateMeasurementsCases: build
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
    deleteMeasurementsCases: build
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
  useGetAllMeasurementsCasesQuery,
  useCreateMeasurementsCasesMutation,
  useUpdateMeasurementsCasesMutation,
  useDeleteMeasurementsCasesMutation,
} = measurementsCasesApi
