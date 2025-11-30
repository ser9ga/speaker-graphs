import {PrismaClient} from "@prisma/client";
import {SpeakerFromDataBase, SpeakerIdFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.speakers.findMany();
}

export const getOne = async (id: SpeakerIdFromDataBase) => {
  return prisma.speakers.findUnique({
    where: {id},
  })
}

export const add = async (speaker: Omit<SpeakerFromDataBase, 'id'>) => {
  return prisma.speakers.create({
    data: speaker,
  });
}

export const update = async (id: SpeakerIdFromDataBase, speaker: Omit<SpeakerFromDataBase, 'id'>) => {
  return prisma.speakers.update({
    where: {id},
    data: speaker,
  });
}

export const remove = async (id: SpeakerIdFromDataBase) => {
  return prisma.speakers.delete({
    where: { id },
  });
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
    console.log('res', res)
  }
})();
