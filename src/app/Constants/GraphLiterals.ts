import { GRAPH_NAME } from '@/app/Constants/GraphName';
import { valueof } from '@/app/Types/TypeUtils';

export const GRAPH_LITERALS = {
  [GRAPH_NAME.PRESSURE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Давление при напряжении тестирования',
    argumentLabel: 'Давление, db',
    unitLabel: 'db'
  },
  [GRAPH_NAME.IMPEDANCE_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Импеданс при напряжении тестирования',
    argumentLabel: 'Импеданс, ohm',
    unitLabel: 'ohm',
  },
  [GRAPH_NAME.SENSITIVITY_FROM_TARGET_VOLTAGE]: {
    diagramLabel: 'Чуствительность',
    argumentLabel: 'Чуствительность, db/m',
    unitLabel: 'db/m'
  },
  [GRAPH_NAME.PRESSURE_FROM_GIVEN_VOLTAGE]: {
    diagramLabel: 'Давление с заданного напряжения',
    argumentLabel: 'Давление, db',
    unitLabel: 'db'
  }
} as const;

export type GraphLiterals = valueof<typeof GRAPH_LITERALS>;
