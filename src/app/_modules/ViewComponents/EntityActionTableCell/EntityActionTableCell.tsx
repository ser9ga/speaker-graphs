import {Button, Popover, Portal, VStack} from '@chakra-ui/react';
import * as React from "react";
import {FC, useState} from "react";
import {MdOutlineDeleteForever, MdOutlineEdit} from "react-icons/md";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {VscTools} from "react-icons/vsc";

interface Props {
  width?: number,
  onEntityClick: () => void;
  onEditClick: (exitCallback?: () => void) => void;
}

export const EntityActionTableCell: FC<Props> = ({
  onEntityClick,
  onEditClick
}) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Popover.Root
      open={isOpened}
      onOpenChange={async (e) => {
        setIsOpened(e.open)
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
                  variant="solid"
                  onClick={() => {
                    setIsOpened(false)
                    onEditClick(() => setIsOpened(false))
                  }}
                >
                  <MdOutlineEdit/>
                  Редактировать
                </Button>

                <ConfirmActionPopover
                  header={'Выполнить удаление?'}
                  onConfirm={onEntityClick}
                  onExitComplete={() => setIsOpened(false)}
                >
                  <Button
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
