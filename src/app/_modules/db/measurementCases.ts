import {PrismaClient} from "@prisma/client";
import {
  MeasurementCaseFromDataBase, MeasurementCaseIdFromDataBase,
  SpeakerFromDataBase,
  SpeakerIdFromDataBase
} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

export const getAll = async () => {
  return prisma.measurementCases.findMany();
}

export const getOne = async (id: MeasurementCaseIdFromDataBase) => {
  return prisma.measurementCases.findUnique({
    where: {id},
  })
}

export const add = async (measurementCase: Omit<MeasurementCaseFromDataBase, 'id'>) => {
  return prisma.measurementCases.create({
    data: measurementCase,
  });
}

export const update = async (id: MeasurementCaseIdFromDataBase, measurementCase: Omit<MeasurementCaseFromDataBase, 'id'>) => {
  return prisma.measurementCases.update({
    where: {id},
    data: measurementCase,
  });
}

export const remove = async (id: MeasurementCaseIdFromDataBase) => {
  return prisma.measurementCases.delete({
    where: { id },
  });
}

(async () => {
  const count = await prisma.speakers.count();
  // if (count === 0) {
  //   const res = await prisma.speakers.createMany({
  //     data: [
  //       { label: "М25.15", coilResistance: 0.7, description: null },
  //       { label: "M45_15", coilResistance: 0.35, description: null },
  //       { label: "М25.15 корч", coilResistance: 0.7, description: 'Какое-то описание' },
  //       { label: "M45_15 корч", coilResistance: 0.2, description: 'Какое-то другое описание' },
  //       { label: "М25.15 корч", coilResistance: 1, description: 'Какое-то описание' },
  //       { label: "M45_15 корч", coilResistance: 2, description: 'Какое-то другое описание' },
  //     ],
  //   });
  //   console.log('res', res)
  // }
})();
