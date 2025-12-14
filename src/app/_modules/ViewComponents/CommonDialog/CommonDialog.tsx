"use client"

import * as React from "react";
import {createOverlay, Dialog, Portal} from "@chakra-ui/react"

interface actEntityDialogProps {
  title: string
  description?: string
  content?: React.ReactNode
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
      {...rest}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>
                  {title}
                </Dialog.Title>
              </Dialog.Header>
            )}
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
