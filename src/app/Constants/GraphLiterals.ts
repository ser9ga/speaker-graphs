import { GRAPH_NAME } from '@/app/Constants/GraphName';
import { valueof } from '@/app/Types/TypeUtils';

export const GRAPH_LITERALS = {
  [GRAPH_NAME.PRESSURE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Давление при напряжении тестирования',
    argumentLabel: 'Давление, dB',
    unitLabel: 'dB'
  },
  [GRAPH_NAME.IMPEDANCE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Импеданс при напряжении тестирования',
    argumentLabel: 'Импеданс, Ohm',
    unitLabel: 'Ohm',
  },
  [GRAPH_NAME.SENSITIVITY_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Чуствительность',
    argumentLabel: 'Чуствительность, dB/m',
    unitLabel: 'dB/m'
  },
  [GRAPH_NAME.PRESSURE_FROM_GIVEN_VOLTAGE]: {
    diagramLabel: 'Давление с заданного напряжения',
    argumentLabel: 'Давление, dB',
    unitLabel: 'dB'
  }
} as const;

export type GraphLiterals = valueof<typeof GRAPH_LITERALS>;
