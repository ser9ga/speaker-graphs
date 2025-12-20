import {CarFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {prisma} from "@/app/_modules/db/prismaClient";

const model = prisma.cars

type EntityFromCatalogue = CarFromCatalogue
type EntityFromDB = Awaited<ReturnType<typeof model.findUnique>>

const mapper = (entity: EntityFromDB): EntityFromCatalogue | null => {
  if (entity === null) {
    return entity;
  }

  return ({
    ...entity,
  })
}

export const getAll = async () => {
  const collection = await model.findMany()

  return collection.map(mapper)
}

export const getOne = async (id: EntityFromCatalogue['id']) => {
  const resultedItem = await model.findUnique({
    where: {id},
  })

  return mapper(resultedItem);
}

export const add = async (initialItem: Omit<EntityFromCatalogue, 'id'>) => {
  const resultedItem = await model.create({
    data: initialItem,
  });

  return mapper(resultedItem);
}

export const update = async (id: EntityFromCatalogue['id'], initialItem: Omit<EntityFromCatalogue, 'id'>) => {
  const item  = await model.update({
    where: {id},
    data: initialItem,
  });

  return mapper(item);
}

export const remove = async (id: EntityFromCatalogue['id']) => {
  const resultedItem = await model.delete({
    where: { id },
  });

  return mapper(resultedItem);
}

export {mapper as carMapper}
