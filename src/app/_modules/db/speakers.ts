import {PrismaClient} from "@prisma/client";
import {SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

const prisma = new PrismaClient({errorFormat: 'minimal',});
const model = prisma.speakers

type EntityFromCatalogue = SpeakerFromCatalogue
type EntityFromDB =Awaited<ReturnType<typeof model.findUnique>>

const mapper = (entity: EntityFromDB): EntityFromCatalogue | null => {
  if (entity === null) {
    return entity;
  }

  return ({
    ...entity,
    size: entity?.size?.toNumber(),
    coilResistance: entity?.coilResistance?.toNumber(),
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
  const count = await prisma.speakers.count();

  if (count === 0) {
    await prisma.speakers.createMany({
      data: [
        { label: "М25.15", size: '15', coilResistance: 0.7, description: null },
        { label: "M45_15", size: '15',coilResistance: 0.35, description: null },
        { label: "М25.15 корч", size: '15',  coilResistance: 0.7, description: 'Какое-то описание' },
        { label: "M45_12 корч1", size: '12', coilResistance: 0.2, description: 'Какое-то другое описание' },
        { label: "М25.12 корч2", size: '12',coilResistance: 1, description: 'Какое-то описание' },
        { label: "M45_12 корч3", size: '12', coilResistance: 2, description: 'Какое-то другое описание' },
      ],
    });
  }
})();

export {mapper as speakerMapper}
