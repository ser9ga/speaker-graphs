import * as React from 'react';
import {HStack} from '@chakra-ui/react';
import {VerticalScaleControlButton} from '@/app/ViewComponents/VerticalScaleControlButton/VerticalScaleControlButton';
import {
  HorizontalScaleControlButton
} from '@/app/ViewComponents/HorizontalScaleControlButton/HorizontalScaleControlButton';
import {CleanLookButton} from '@/app/ViewComponents/CleanLookButton/CleanLookButton';
import {ChooseImportFilesButton} from '@/app/ViewComponents/ChooseImportFilesButton/ChooseImportFilesButton';

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
