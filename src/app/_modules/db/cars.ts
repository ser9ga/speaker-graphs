import {PrismaClient} from "@prisma/client";
import {CarFromDataBase, CarIdFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.cars.findMany();
}

export const getOne = async (id: CarIdFromDataBase) => {
  return prisma.cars.findUnique({
    where: {id},
  })
}

export const add = async (car: Omit<CarFromDataBase, 'id'>) => {
  return prisma.cars.create({
    data: car,
  });
}

export const update = async (id: CarIdFromDataBase, data: Omit<CarFromDataBase, 'id'>) => {
  return prisma.cars.update({
    where: {id},
    data: data,
  });
}

export const remove = async (id: CarIdFromDataBase) => {
  return prisma.cars.delete({
    where: { id },
  });
}

(async () => {
  const count = await prisma.cars.count();
  if (count === 0) {
    const res = await prisma.cars.createMany({
      data: [
        { label: "Приора седан", description: null },
        { label: "Гранта седан", description: 'Какое-то описание машины' },
        { label: "Матиз", description: null },
        { label: "Веста", description: null },
      ],
    });
    console.log('res', res)
  }
})();
