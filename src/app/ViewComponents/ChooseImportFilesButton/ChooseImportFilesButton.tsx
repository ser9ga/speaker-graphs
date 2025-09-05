import * as React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useAppDispatch } from '@/app/Store/Hooks';
import { PiFileCsvLight } from 'react-icons/pi';
import { setFileChooseModalOpened } from '@/app/Store/AppControl/AppControlSlice';

export const ChooseImportFilesButton = () => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setFileChooseModalOpened(true))}
    >
      <PiFileCsvLight />
    </IconButton>
  );
}
