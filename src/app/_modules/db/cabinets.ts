import {PrismaClient} from "@prisma/client";
import {CabinetFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

const prisma = new PrismaClient();
const model = prisma.cabinets

type EntityFromCatalogue = CabinetFromCatalogue
type EntityFromDB = Awaited<ReturnType<typeof model.findUnique>>

const mapper = (entity: EntityFromDB): EntityFromCatalogue | null => {
  if (entity === null) {
    return entity;
  }

  return ({
    ...entity,
     volume: entity.volume.toNumber(),
     speakerSize: entity.speakerSize.toNumber(),
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

  return mapper(resultedItem);;
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
  const count = await prisma.cabinets.count();
  if (count === 0) {
    const res = await prisma.cabinets.createMany({
      data: [
        { volume: 45, speakerSize: 12, description: null},
        { volume: 50, speakerSize: 12, description: 'Описание короба'},
        { volume: 55, speakerSize: 12, description: null},
        { volume: 115, speakerSize: 15, description: 'Еще одно описание короба'},
        { volume: 120, speakerSize: 15, description: null},
        { volume: 125, speakerSize: 15, description: null},
      ],
    });
  }
})();

export {mapper as cabinetMapper}
