import * as React from 'react';
import { Flex, Show, VStack } from '@chakra-ui/react';
import { LegendCases } from '@/app/ViewComponents/LegendCases/LegendCases';
import {
  VerticalScaleControlButton
} from '@/app/ViewComponents/VerticalScaleControlButton/VerticalScaleControlButton';
import {
  HorizontalScaleControlButton
} from '@/app/ViewComponents/HorizontalScaleControlButton/HorizontalScaleControlButton';
import { CleanLookButton } from '@/app/ViewComponents/CleanLookButton/CleanLookButton';
import { isCleanLookEnabledSelector } from '@/app/Store/AppControl/AppControlSelectors';
import { useAppSelector } from '@/app/Store/Hooks';
import { measurementMetasSelector } from '@/app/Store/GraphData/GraphDataSelectors';
import { ChooseImportFilesButton } from '@/app/ViewComponents/ChooseImportFilesButton/ChooseImportFilesButton';

export const ControlPanel = () => {
  const isCleanLookEnabled = useAppSelector(isCleanLookEnabledSelector)
  const measurements  = useAppSelector(measurementMetasSelector)

  return (
    <Flex
      gap={'20px'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <LegendCases
        items={measurements}
      />
      <Show <boolean> when={!isCleanLookEnabled}>
        <VStack>
          <VerticalScaleControlButton />
          <HorizontalScaleControlButton />
          <ChooseImportFilesButton />
          <CleanLookButton />
        </VStack>
      </Show>
    </Flex>
  );
}
