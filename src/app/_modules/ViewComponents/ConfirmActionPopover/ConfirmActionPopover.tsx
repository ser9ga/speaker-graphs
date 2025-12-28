import {Button, HStack, Popover, Portal, Text} from "@chakra-ui/react"
import React, {FC, ReactNode, useState} from "react";

interface ConfirmActionPopoverProps {
  header: ReactNode,
  description?: ReactNode,
  confirmButtonLabel?: string,
  onConfirm?: () => void,
  onReject?: () => void,
  onExitComplete?: () => void,
  beforePopover?: () => Promise<boolean>
  children: ReactNode
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover.Root
      onExitComplete={onExitComplete}
      open={isOpen}
      onOpenChange={async (e) => {
        if (e.open && typeof beforePopover === "function") {
          const releaseFlag = await beforePopover();

          if (releaseFlag) {
            setIsOpen(e.open)
          }
        } else {
          setIsOpen(e.open)
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
