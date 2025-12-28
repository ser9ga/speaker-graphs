import {Button, Popover, Portal, VStack} from '@chakra-ui/react';
import * as React from "react";
import {FC, useState} from "react";
import {MdOutlineDeleteForever, MdOutlineEdit} from "react-icons/md";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {VscTools} from "react-icons/vsc";

interface Props {
  width?: number,
  onEditClick: (exitCallback?: () => void) => void;
  onDeleteClick: (callback?: () => void) => void;
}

export const EntityActionTableCell: FC<Props> = ({
  onEditClick,
  onDeleteClick
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={async (e) => {
        setIsOpen(e.open)
      }}
    >
      <Popover.Trigger>
        <VscTools />
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content width={'205px'}>
            <Popover.Arrow />
            <Popover.Body>
              <VStack
                gap={'10px'}
                alignItems={'start'}
              >
                <Button
                  size={'sm'}
                  variant="solid"
                  onClick={() => {
                    setIsOpen(false)
                    onEditClick(() => setIsOpen(false))
                  }}
                >
                  <MdOutlineEdit/>
                  Редактировать
                </Button>

                <ConfirmActionPopover
                  header={'Выполнить удаление?'}
                  onConfirm={() => onDeleteClick(() => setIsOpen(false))}
                  onExitComplete={() => setIsOpen(false)}
                >
                  <Button
                    size={'sm'}
                    variant="surface"
                  >
                    <MdOutlineDeleteForever/>
                    Удалить
                  </Button>
                </ConfirmActionPopover>
              </VStack>
            </Popover.Body>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
