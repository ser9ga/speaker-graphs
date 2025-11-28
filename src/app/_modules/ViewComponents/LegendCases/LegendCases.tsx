import { Flex, Text } from '@chakra-ui/react';
import { LegendItem } from '@/app/_modules/ViewComponents/LegendItem/LegendItem';
import { MeasurementUnitWithUniqName } from '@/app/_modules/Types/GraphDataTypes';

interface LegendCasesProps {
  items: MeasurementUnitWithUniqName[] | null;
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
      {items.map((item) => (
        <LegendItem
          key={item.uniqName}
          uniqName={item.uniqName}
          speakerLabel={item.speakerLabel}
          cabinetLabel={item.cabinetLabel}
          portDiameter={item.portDiameter + 'мм'}
          portLength={item.portLength + 'мм'}
          carLabel={item.carLabel}
          doorState={item.isDoorOpened ? 'Открыта' : 'Закрыта'}
          voltageOfTesting={`${item.voltageOfTesting}v`}
        />
      ))}
    </Flex>
  );
}
