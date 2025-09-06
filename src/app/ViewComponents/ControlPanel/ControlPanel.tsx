import * as React from 'react';
import {Flex, Show} from '@chakra-ui/react';
import {LegendCases} from '@/app/ViewComponents/LegendCases/LegendCases';
import {isCleanLookEnabledSelector} from '@/app/Store/AppControl/AppControlSelectors';
import {useAppSelector} from '@/app/Store/Hooks';
import {measurementMetasSelector} from '@/app/Store/GraphData/GraphDataSelectors';
import {ControlButtonBar} from "@/app/ViewComponents/ControlButtonBar/ControlButtonBar";

export const ControlPanel = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector)
  const measurements  = useAppSelector(measurementMetasSelector)

  return (
    <Flex
      gap={'20px'}
      width={'100%'}
      height={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <LegendCases items={measurements} />
      <Show <boolean> when={!isCleanLookEnabled}>
        <ControlButtonBar />
      </Show>
    </Flex>
  );
}
