import * as React from 'react';
import {Flex, Show} from '@chakra-ui/react';
import {LegendCases} from '@/app/_modules/ViewComponents/LegendCases/LegendCases';
import {isCleanLookEnabledSelector} from '@/app/_modules/Store/GraphSetControl/GraphSetControlSelectors';
import {useAppSelector} from '@/app/_modules/Store/Hooks';
import {measurementMetasSelector} from '@/app/_modules/Store/GraphData/GraphDataSelectors';
import {ControlButtonBar} from "@/app/_modules/ViewComponents/ControlButtonBar/ControlButtonBar";

export const ControlPanel = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector)
  const measurementMetas  = useAppSelector(measurementMetasSelector)

  return (
    <Flex
      gap={'20px'}
      width={'100%'}
      height={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <LegendCases items={measurementMetas} />
      <Show <boolean> when={!isCleanLookEnabled}>
        <ControlButtonBar />
      </Show>
    </Flex>
  );
}
