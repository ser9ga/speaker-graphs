import {PrismaClient} from "@prisma/client";
import {PortFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

const prisma = new PrismaClient();
const model = prisma.ports

type EntityFromCatalogue = PortFromCatalogue
type EntityFromDB = Awaited<ReturnType<typeof model.findUnique>>

const mapper = (entity: EntityFromDB): EntityFromCatalogue | null => {
  if (entity === null) {
    return entity;
  }

  return ({
    ...entity,
    length: entity?.length?.toNumber(),
    diameter: entity?.diameter?.toNumber(),
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
  const resultedItem =  await model.create({
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

(async () => {
  const count = await prisma.ports.count();
  if (count === 0) {
    await prisma.ports.createMany({
      data: [
        { diameter: 100, length: 200, description: null },
        { diameter: 100, length: 300, description: null },
        { diameter: 100, length: 400, description: 'Какое-то описание порта' },
        { diameter: 200, length: 200, description: null },
        { diameter: 200, length: 300, description: null },
        { diameter: 250, length: 400, description: 'Еще акое-то описание порта' },
      ],
    });
  }
})();

export {mapper as portMapper}
