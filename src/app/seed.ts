import {prisma} from "@/app/_modules/db/prismaClient";

const seedSpeakers = async () => {
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
};

const seedCabinets = async () => {
  const count = await prisma.cabinets.count();

  if (count === 0) {
    await prisma.cabinets.createMany({
      data: [
        { volume: 45, speakerSize: 12, description: null},
        { volume: 50, speakerSize: 12, description: 'Описание короба'},
        { volume: 55, speakerSize: 12, description: null},
        { volume: 115, speakerSize: 15, description: 'Еще одно описание короба'},
        { volume: 120, speakerSize: 15, description: null},
        { volume: 125, speakerSize: 15, description: null},
      ],
    });
  }
};

const seedPorts = async () => {
  const count = await prisma.ports.count();

  if (count === 0) {
    await prisma.ports.createMany({
      data: [
        { diameter: 100, length: 200, description: null },
        { diameter: 100, length: 300, description: null },
        { diameter: 100, length: 400, description: 'Какое-то описание порта' },
        { diameter: 200, length: 200, description: null },
        { diameter: 200, length: 300, description: null },
        { diameter: 250, length: 400, description: 'Еще акое-то описание порта' },
      ],
    });
  }
};

const seedCars = async () => {
  const count = await prisma.cars.count();

  if (count === 0) {
    await prisma.cars.createMany({
      data: [
        { label: "Приора седан", description: null },
        { label: "Гранта седан", description: 'Какое-то описание машины' },
        { label: "Матиз", description: null },
        { label: "Веста", description: null },
      ],
    });
  }
};

export const seedALL = () => {
  seedSpeakers();
  seedCabinets();
  seedPorts();
  seedCars();

  console.log('seeded!')
}
