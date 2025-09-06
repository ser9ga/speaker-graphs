import { DataFromJsonFile } from '@/app/Types/dataFromJsonFile';
import { GraphOptionSet, MeasurementMeta, StoreGraphDataItem } from '@/app/Types/GraphDataTypes';
import { LegendColors } from '@/app/Constants/Colors';

export const parseDataFromFile = (
  rawData: DataFromJsonFile,
  params: {
    strokeColor: LegendColors;
  }
): StoreGraphDataItem => {
  const uniqName = rawData.meta.id?.toString()
    ?? [rawData.meta.speaker.id || rawData.meta.speaker.label,
      rawData.meta.cabinet.id || rawData.meta.cabinet.label,
      rawData.meta.car.id || rawData.meta.car.label,
      rawData.meta.port.id || `${rawData.meta.port.diameter}_${rawData.meta.port.length}`,
      rawData.meta.isDoorOpened,
      rawData.meta.voltageOfTesting,
      Math.random().toFixed(5)
    ]
      .join('_');

  const measurementMeta: MeasurementMeta = {
    speakerLabel: rawData.meta.speaker.label,
    cabinetLabel: rawData.meta.cabinet.label,
    portDiameter: rawData.meta.port.diameter,
    portLength: rawData.meta.port.length,
    carLabel: rawData.meta.car.label,
    voltageOfTesting: rawData.meta.voltageOfTesting,
    isDoorOpened: rawData.meta.isDoorOpened,
  }

  const graphOptions: GraphOptionSet = {
    strokeColor: params?.strokeColor,
    isCompensationEnabled: false,
    isVisible: true
  }

  return {
    uniqName,
    measurementMeta,
    graphOptions,
    graphData: rawData.data
  }
};
