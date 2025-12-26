'use client'

import {CloseButton, createOverlay, Drawer, Portal} from '@chakra-ui/react';
import * as React from 'react';
import {ReactNode} from 'react';

interface actEntityDialogProps {
  errorList: ReactNode;
}

export const errorListDrawer = createOverlay<actEntityDialogProps>((props) => {
  const {
    open,
    onOpenChange,
    errorList
  } = props;

  return (
    <Drawer.Root
      size={'md'}
      open={open}
      onOpenChange={(arg) => {onOpenChange?.(arg)}}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Trigger />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title>
                Ошибки импорта:
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {errorList}
            </Drawer.Body>
            <Drawer.Footer />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
})
