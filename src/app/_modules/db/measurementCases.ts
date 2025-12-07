import {PrismaClient} from "@prisma/client";
import {MeasurementCaseFromDataBase, MeasurementCaseIdFromDataBase} from "@/app/_modules/Types/dataFromDataBase";

const prisma = new PrismaClient();

const inclusion = {
  meta: {
    include: {
      speaker: true,
      cabinet: true,
      port: true,
      car: true,
    },
    omit: {
      id: true,
      measurementCaseId: true,
      speakerId: true,
      cabinetId: true,
      portId: true,
      carId: true,
    },
  },
  data: {
    omit: {
      id: true,
      measurementCaseId: true,
    }
  },
}

const mockMeasurementCase = {
  meta: {
    create: {
      isDoorOpened: false,
      voltageOfTesting: 40,
      description: 'Описание измерения',
      speaker: {
        connect: {
          id: 4
        }
      },
      cabinet: {
        connect: {
          id: 1
        }
      },
      port: {
        connect: {
          id: 1
        }
      },
      car: {
        connect: {
          id: 1
        }
      }
    }
  },
  data: {
    create: [{
      frequency: 20,
      Uin: 31.2,
      I: 10.4,
      Pa: 59
    }]
  }
}

const mockModifiedMeasurementCase = {
  meta: {
    upsert: {
      isDoorOpened: true,
      voltageOfTesting: 40,
      description: 'Описание измерения',
      speaker: {
        connect: {
          id: 4
        }
      },
      cabinet: {
        connect: {
          id: 1
        }
      },
      port: {
        connect: {
          id: 1
        }
      },
      car: {
        connect: {
          id: 1
        }
      }
    }
  },
  data: {
    create: [{
      frequency: 20,
      Uin: 31.2,
      I: 10.4,
      Pa: 59
    }]
  }
}

export const getAll = async () => {
  return prisma.measurementCases.findMany({
    include: inclusion,
  });
}

export const getOne = async (id: MeasurementCaseIdFromDataBase) => {
  return prisma.measurementCases.findUnique({
    where: {id},
    include: inclusion,
  })
}


export const add = async (measurementCase: Omit<MeasurementCaseFromDataBase, 'id'>) => {
  return prisma.measurementCases.create({
    data: measurementCase,
    include: inclusion,
  });
}

export const update = async (id: MeasurementCaseIdFromDataBase, measurementCase: Omit<MeasurementCaseFromDataBase, 'id'>) => {
  return prisma.measurementCases.update({
    where: {id},
    data: mockModifiedMeasurementCase,
  });
}

export const remove = async (id: MeasurementCaseIdFromDataBase) => {
  return prisma.measurementCases.delete({
    where: { id },
  });
}

(async () => {
  const count = await prisma.measurementCases.count();
  if (count === 0) {
    const res = await prisma.measurementCases.createMany({
      data: [
        mockMeasurementCase
      ],
    });

    console.log('res', res)
  }
})();
