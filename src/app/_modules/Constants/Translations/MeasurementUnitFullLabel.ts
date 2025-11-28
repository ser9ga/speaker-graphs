import { UNIT } from '@/app/_modules/Constants/Unit';
import { valueof } from '@/app/_modules/Types/TypeUtils';

export const MEASUREMENT_UNIT_FULL_LABEL = {
  [UNIT.Uin]: 'Напражение питания',
  [UNIT.I]: 'Ток питания',
  [UNIT.Pa]: 'Звуковое давление',
  'Uout': 'Напряжение тестирования',
  [UNIT.P]: 'Мощность питания',
  [UNIT.Z]: 'Импеданс нагрузки',
  [UNIT.S]: 'Чуствительность динамика',
  [UNIT.PaUout]: 'Звуковое давление при напряжении тестирования',
  [UNIT.PPamax]: 'Мощность питания при максимальном звуковом давлении',
} as const;

export type MeasurementUnitFullLabel = valueof<typeof MEASUREMENT_UNIT_FULL_LABEL>;
