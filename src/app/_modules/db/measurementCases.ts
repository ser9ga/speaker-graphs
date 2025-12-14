import {PrismaClient} from "@prisma/client";
import {MeasurementCaseFromCatalogue} from "@/app/_modules/Types/dataFromCatalogue";
import {speakerMapper} from './speakers'
import {cabinetMapper} from './cabinets'
import {portMapper} from './ports'
import {carMapper} from './cars'

const prisma = new PrismaClient();
const model = prisma.measurementCases

type EntityFromCatalogue = MeasurementCaseFromCatalogue
type EntityFromDB =  Awaited<ReturnType<typeof model.findUnique>>

const measurementDataMapper = (initialCollecton) => initialCollecton
  .reduce((acc, cur) => {
    const {frequency, ...rest} = cur
    return {
      ...acc,
      [frequency]: {
        I: rest.I?.toNumber() || null,
        Pa: rest.Pa?.toNumber() || null,
        Uin: rest.Uin?.toNumber() || null,
      },
    }
  }, {})

const mapper = (measurementCase: EntityFromDB): EntityFromCatalogue | null => {
  if (measurementCase === null) {
    return measurementCase;
  }

  return ({
    ...measurementCase,
    meta: {
      ...measurementCase.meta,
      speaker: speakerMapper(measurementCase.meta.speaker),
      cabinet: cabinetMapper(measurementCase.meta.cabinet),
      port: portMapper(measurementCase.meta.port),
      car: carMapper(measurementCase.meta.car),
      voltageOfTesting: measurementCase.meta.voltageOfTesting.toNumber(),
    },
    data: measurementDataMapper(measurementCase.data)
  })
}

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
    create: [
      {
        frequency: 20,
        Uin: 31.2,
        I: 10.4,
        Pa: 59
      },
      {
        frequency: 21,
        Uin: 31.2,
        I: 10.4,
        Pa: 59
      },
    ]
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
  const collection = await prisma.measurementCases.findMany({
    include: inclusion,
  });

  return collection.map(mapper)
}

export const getOne = async (id: MeasurementCaseFromCatalogue['id']) => {
  const item = await prisma.measurementCases.findUnique({
    where: {id},
    include: inclusion,
  })

  return mapper(item)
}

export const add = async (measurementCase: Omit<MeasurementCaseFromCatalogue, 'id'>) => {
  const item = await  prisma.measurementCases.create({
    data: measurementCase,
    include: inclusion,
  });

  return mapper(item)
}

export const update = async (id: MeasurementCaseFromCatalogue['id'], measurementCase: Omit<MeasurementCaseFromCatalogue, 'id'>) => {
  const item = await  prisma.measurementCases.update({
    where: {id},
    data: mockModifiedMeasurementCase,
  });

  return mapper(item)
}

export const remove = async (id: MeasurementCaseFromCatalogue['id']) => {
  const item = await  prisma.measurementCases.delete({
    where: { id },
  });

  return mapper(item)
}

(async () => {
  const count = await prisma.measurementCases.count();
  // if (count === 0) {
    const res = await prisma.measurementCases.createMany({
      data: [
        mockMeasurementCase
      ],
    });
  // }
})();
