import {PrismaClient} from "@prisma/client";
import {SpeakerFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";

const prisma = new PrismaClient();
const model = prisma.speakers

type EntityFromCatalogue = SpeakerFromCatalogue
type EntityFromDB =Awaited<ReturnType<typeof model.findUnique>>

const mapper = (entity: EntityFromDB): EntityFromCatalogue | null => {
  if (entity === null) {
    return entity;
  }

  return ({
    ...entity,
    coilResistance: entity.coilResistance.toNumber(),
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
  const count = await prisma.speakers.count();

  if (count === 0) {
    const res = await prisma.speakers.createMany({
      data: [
        { label: "М25.15", coilResistance: 0.7, description: null },
        { label: "M45_15", coilResistance: 0.35, description: null },
        { label: "М25.15 корч", coilResistance: 0.7, description: 'Какое-то описание' },
        { label: "M45_15 корч1", coilResistance: 0.2, description: 'Какое-то другое описание' },
        { label: "М25.15 корч2", coilResistance: 1, description: 'Какое-то описание' },
        { label: "M45_15 корч3", coilResistance: 2, description: 'Какое-то другое описание' },
      ],
    });
  }
})();

export {mapper as speakerMapper}
