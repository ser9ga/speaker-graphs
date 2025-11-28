export function serviceFabric<T extends Record<string, any>> (entitiesName: string){
  const getAll = async () => {
    try {
      const response = await fetch(`/entities/${entitiesName}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOne = async (id: number) => {
    try {
      const response = await fetch(`/entities/${entitiesName}/${id}`);

      if (!response.ok) {
        throw new Error("Not 2xx response", {cause: response});
      }

      return response.json();
    } catch (error) {
      console.error("Error:", error);
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
    } catch (error) {
      console.error("Error:", error);
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
    } catch (error) {
      console.error("Error:", error);
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
    } catch (error) {
      console.error("Error:", error);
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
