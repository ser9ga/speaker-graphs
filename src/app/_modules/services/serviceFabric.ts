import {toaster} from "@/app/_modules/components/ui/toaster";

export function serviceFabric<T extends Record<string, any>> (
  path: string,
  collectionLabel: string,
){
  const getAll = async () => {
    try {
      const response = await fetch(`${path}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось загрузить ${collectionLabel}`,
        type: "error",
      })

      return {
        isError: true,
        ...e
      }    }
  };

  const getOne = async (id: number) => {
    try {
      const response = await fetch(`${path}/${id}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось загрузить ${collectionLabel}`,
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
      const response = await fetch(`${path}`,{
        method: 'POST',
        body: JSON.stringify(entity),
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (e: object) {
      toaster.create({
        description: `Не удалось создать ${collectionLabel}`,
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
      const response = await fetch(`${path}/${id}`,{
        method: 'PUT',
        body: JSON.stringify(rest),
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json() as unknown as T;
    } catch (e: object) {
      toaster.create({
        description: `Не удалось изменить ${collectionLabel}`,
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
      const response = await fetch(`${path}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }
    } catch (e: object) {
      toaster.create({
        description: `Не удалось удалить ${collectionLabel}`,
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
