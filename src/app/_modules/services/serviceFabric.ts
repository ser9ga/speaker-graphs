import {toaster} from "@/app/_modules/components/ui/toaster";

export function serviceFabric<T extends Record<string, any>> (
  entitiesName: string,
  entityLabel: string
){
  const getAll = async () => {
    try {
      const response = await fetch(`/entities/${entitiesName}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось загрузить ${entityLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }    }
  };

  const getOne = async (id: number) => {
    try {
      const response = await fetch(`/entities/${entitiesName}/${id}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось загрузить ${entityLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }
    }
  }

  const add = async (entity: Omit<T, 'id'>) => {
    try {
      const response = await fetch(`/entities/${entitiesName}`,{
        method: 'POST',
        body: JSON.stringify(entity),
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось создать ${entityLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }
    }
  }



  const update = async (entity: T) => {
    try {
      const  {id, ...rest} = entity;
      const response = await fetch(`/entities/${entitiesName}/${id}`,{
        method: 'PUT',
        body: JSON.stringify(rest),
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json() as unknown as T;
    } catch (e: object) {
      toaster.create({
        description: `Не удалось изменить ${entityLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }
    }
  }

  const remove = async (id: number) => {
    try {
      const response = await fetch(`/entities/${entitiesName}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }
    } catch (e: object) {
      toaster.create({
        description: `Не удалось удалить ${entityLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }
    }
  }

  return {
    getAll,
    getOne,
    add,
    update,
    remove,
  }
}
