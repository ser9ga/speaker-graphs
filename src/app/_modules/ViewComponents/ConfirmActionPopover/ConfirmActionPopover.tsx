import {Button, HStack, Popover, Portal, Text} from "@chakra-ui/react"
import React, {FC, useState} from "react";

interface ConfirmActionPopoverProps {
  header: React.ReactNode,
  description?: React.ReactNode,
  confirmButtonLabel?: string,
  onConfirm?: () => void,
  onReject?: () => void,
  onExitComplete?: () => void,
  beforePopover?: () => Promise<boolean>
  children: React.ReactNode
}

export const ConfirmActionPopover: FC<ConfirmActionPopoverProps> = ({
  header,
  description,
  confirmButtonLabel,
  onConfirm,
  children,
  onExitComplete,
  beforePopover
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root
      onExitComplete={onExitComplete}
      open={open}
      onOpenChange={async (e) => {
        if (e.open && typeof beforePopover === "function") {
          const releaseFlag = await beforePopover();

          if (releaseFlag) {
            setOpen(e.open)
          }
        } else {
          setOpen(e.open)
        }
      }}
    >
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            minWidth={'200px'}
            width={'270px'}
          >
            <Popover.Arrow />
            <Popover.Body width={'100%'}>
              <Popover.Title fontWeight="medium">
                {header}
              </Popover.Title>
              <Text my="4">
                {description}
              </Text>
              <HStack
                gap={'12px'}
                justifyContent={'end'}
              >
                <Button
                  size="sm"
                  variant="solid"
                  {...(onConfirm && {onClick: onConfirm})}
                >
                  {confirmButtonLabel || 'Подтвердить'}
                </Button>
              </HStack>
            </Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
