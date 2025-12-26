'use client'

import * as React from "react";
import {ReactNode} from "react";
import {CloseButton, createOverlay, Dialog, HStack, Portal} from "@chakra-ui/react"
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";

interface actEntityDialogProps {
  title: string
  description?: string
  content?: ReactNode
  onExitClick?: () => void;
  exitCallback?: () => void;
}

export const commonDialog = createOverlay<actEntityDialogProps>((props) => {
  const {
    title,
    description,
    content,
    open,
    onOpenChange,
    exitCallback,
    ...rest
  } = props;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(arg) => {
        onOpenChange?.(arg)
        exitCallback?.()
      }}
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
      closeOnEscape={false}
      closeOnInteractOutside={false}
      {...rest}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header padding={'16px'}>
              <HStack
                width={'100%'}
                justifyContent={'space-between'}
              >
                <Dialog.Title padding={'0px 12px'}>
                  {title}
                </Dialog.Title>
                <ConfirmActionPopover
                  header={'Закрыть окно?'}
                  onConfirm={() => onOpenChange?.({open: false})}
                  confirmButtonLabel={'Закрыть'}
                >
                  <CloseButton size="md"/>
                </ConfirmActionPopover>
              </HStack>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>
                  {description}
                </Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})
