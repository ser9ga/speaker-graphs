import {PrismaClient} from "@prisma/client";
import {CabinetFromDataBase, CabinetIdFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.cabinets.findMany();
}

export const getOne = async (id: CabinetIdFromDataBase) => {
  return prisma.cabinets.findUnique({
    where: {id},
  })
}

export const add = async (cabinet: Omit<CabinetFromDataBase, 'id'>) => {
  return prisma.cabinets.create({
    data: cabinet,
  });
}

export const update = async (id: CabinetIdFromDataBase, data: Omit<CabinetFromDataBase, 'id'>) => {
  return prisma.cabinets.update({
    where: {id},
    data: data,
  });
}

export const remove = async (id: CabinetIdFromDataBase) => {
  return prisma.cabinets.delete({
    where: { id },
  });
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
    console.log('res', res)
  }
})();
