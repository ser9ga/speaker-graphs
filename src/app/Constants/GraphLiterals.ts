import { GRAPH_NAME } from '@/app/Constants/GraphName';
import { valueof } from '@/app/Types/TypeUtils';

export const GRAPH_LITERALS = {
  [GRAPH_NAME.PRESSURE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Давление при напряжении тестирования',
    argumentLabel: 'Давление, db'
  },
  [GRAPH_NAME.IMPEDANCE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Импеданс при напряжении тестирования',
    argumentLabel: 'Импеданс, ohm',
  },
  [GRAPH_NAME.SENSITIVITY_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Чуствительность',
    argumentLabel: 'Чуствительность, db/m'
  },
  [GRAPH_NAME.PRESSURE_FROM_GIVEN_VOLTAGE]: {
    diagramLabel: 'Давление с заданного напряжения',
    argumentLabel: 'Давление, db'
  }
} as const;

export type GraphLiterals = valueof<typeof GRAPH_LITERALS>;
