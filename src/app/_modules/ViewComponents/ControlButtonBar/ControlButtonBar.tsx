import * as React from 'react';
import {HStack} from '@chakra-ui/react';
import {VerticalScaleControlButton} from '@/app/_modules/ViewComponents/VerticalScaleControlButton/VerticalScaleControlButton';
import {
  HorizontalScaleControlButton
} from '@/app/_modules/ViewComponents/HorizontalScaleControlButton/HorizontalScaleControlButton';
import {CleanLookButton} from '@/app/_modules/ViewComponents/CleanLookButton/CleanLookButton';
import {ChooseImportFilesButton} from '@/app/_modules/ViewComponents/ChooseImportFilesButton/ChooseImportFilesButton';

export const ControlButtonBar = () => {
  return (
    <HStack alignSelf={'flex-end'}>
      <VerticalScaleControlButton />
      <HorizontalScaleControlButton />
      <ChooseImportFilesButton />
      <CleanLookButton />
    </HStack>
  );
}
