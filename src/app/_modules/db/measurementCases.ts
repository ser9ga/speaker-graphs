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
  ?.reduce((acc, cur) => {
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
      ...measurementCase?.meta,
      speaker: speakerMapper(measurementCase.meta?.speaker),
      cabinet: cabinetMapper(measurementCase.meta?.cabinet),
      port: portMapper(measurementCase.meta?.port),
      car: carMapper(measurementCase.meta?.car),
      voltageOfTesting: measurementCase.meta?.voltageOfTesting?.toNumber?.(),
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
      measurementCaseId: true,
    }
  },
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
  const parsedMeasurementCase = {
    meta: {
      create: {
        speaker: {
          connect: {
            id: measurementCase.meta.speaker.id,
          }
        },
        cabinet: {
          connect: {
            id: measurementCase.meta.cabinet.id,
          }
        },
        port: {
          connect: {
            id: measurementCase.meta.port.id,
          }
        },
        car: {
          connect: {
            id: measurementCase.meta.car.id,
          }
        },
        voltageOfTesting: Number(measurementCase.meta.voltageOfTesting),
        isDoorOpened: measurementCase.meta.isDoorOpened,
        description: measurementCase.meta.description,
      }
    },
    data: {
      create:
        Object.entries(measurementCase.data)
          .map(([measurementCaseId, data]) => ({
            frequency: Number(measurementCaseId),
            Uin: Number(data.Uin),
            I: Number(data.I),
            Pa: Number(data.Pa),
          }))
    }
  }

  const item = await prisma.measurementCases.create({
    data: parsedMeasurementCase,
    include: inclusion,
  });

  return mapper(item)
}

export const update = async (id: MeasurementCaseFromCatalogue['id'], measurementCase: Omit<MeasurementCaseFromCatalogue, 'id'>) => {
  const parsedMeasurementCase = {
    where: {id},
    data: {
      meta: {
        update: {
          speaker: {
            connect: {
              id: measurementCase.meta.speaker.id,
            }
          },
          cabinet: {
            connect: {
              id: measurementCase.meta.cabinet.id,
            }
          },
          port: {
            connect: {
              id: measurementCase.meta.port.id,
            }
          },
          car: {
            connect: {
              id: measurementCase.meta.car.id,
            }
          },
          voltageOfTesting: Number(measurementCase.meta.voltageOfTesting),
          isDoorOpened: measurementCase.meta.isDoorOpened,
          description: measurementCase.meta.description,
        }
      },
      data: {
        update:
          Object.entries(measurementCase.data)
            .map(([measurementCaseId, data]) => ({
              where: {
                compositeId: {
                  measurementCaseId: id,
                  frequency: Number(measurementCaseId)
                }
              },
              data:{
                Uin: Number(data.Uin),
                I: Number(data.I),
                Pa: Number(data.Pa),
              }
            }))
      }
    },
    include: inclusion,
  };

  const item = await  prisma.measurementCases.update(parsedMeasurementCase);

  return mapper(item)
}

export const remove = async (id: MeasurementCaseFromCatalogue['id']) => {
  const item = await  prisma.measurementCases.delete({
    where: { id },
  });

  return mapper(item)
}
