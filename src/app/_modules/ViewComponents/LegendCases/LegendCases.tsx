import {Flex, Text} from '@chakra-ui/react';
import {LegendItem} from '@/app/_modules/ViewComponents/LegendItem/LegendItem';
import {MeasurementUnitWithId} from '@/app/_modules/Types/dataForGraphs';

interface LegendCasesProps {
  items: MeasurementUnitWithId[] | null;
}
export const LegendCases = (
  {items}: LegendCasesProps
) => {
  if (!items || items.length === 0) {
    return (
      <Text alignSelf={'flex-start'}>
        Не выбран ни один случай измерения
      </Text>
    )
  }

  return (
    <Flex
      direction='column'
      gap={'3px'}
      alignSelf={'flex-end'}
    >
      {items.map((meta) => (
        <LegendItem
          key={meta.id}
          id={meta.id}
          speakerLabel={meta.speaker.label}
          cabinetVolume={meta.cabinet.volume}
          portDiameter={meta.port.diameter + 'мм'}
          portLength={meta.port.length + 'мм'}
          carLabel={meta.car.label}
          doorState={meta.isDoorOpened ? 'Открыта' : 'Закрыта'}
          voltageOfTesting={`${meta.voltageOfTesting}v`}
        />
      ))}
    </Flex>
  );
}
