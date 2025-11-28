import {PrismaClient} from "@prisma/client";
import {PortFromDataBase, PortIdFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.ports.findMany();
}

export const getOne = async (id: PortIdFromDataBase) => {
  return prisma.ports.findUnique({
    where: {id},
  })
}

export const add = async (port: Omit<PortFromDataBase, 'id'>) => {
  return prisma.ports.create({
    data: port,
  });
}

export const update = async (id: PortIdFromDataBase, data: Omit<PortFromDataBase, 'id'>) => {
  return prisma.ports.update({
    where: {id},
    data: data,
  });
}

export const remove = async (id: PortIdFromDataBase) => {
  return prisma.ports.delete({
    where: { id },
  });
}

(async () => {
  const count = await prisma.ports.count();
  if (count === 0) {
    const res = await prisma.ports.createMany({
      data: [
        { diameter: 100, length: 200, description: null },
        { diameter: 100, length: 300, description: null },
        { diameter: 100, length: 400, description: 'Какое-то описание порта' },
        { diameter: 200, length: 200, description: null },
        { diameter: 200, length: 300, description: null },
        { diameter: 250, length: 400, description: 'Еще акое-то описание порта' },
      ],
    });
    console.log('res', res)
  }
})();
