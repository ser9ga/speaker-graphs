import {Box, Button, HStack} from '@chakra-ui/react';
import * as React from "react";
import {FC, useState} from "react";
import {MdOutlineDeleteForever, MdOutlineEdit} from "react-icons/md";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import styles from "./EntityActionTableCell.module.scss";
import classNames from "classnames";

interface Props {
  width?: number,
  onEntityClick: () => void;
  onEditClick: (exitCallback?: () => void) => void;
}

export const EntityActionTableCell: FC<Props> = ({
  onEntityClick,
  onEditClick
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Box className={classNames(!isOpened && styles.cellWrapper)}>
      <HStack
        className={classNames(!isOpened && styles.cellButtonsWrapper)}
        gap={'0px'}
      >
        <Button
          variant="ghost"
          padding={'0px'}
          onClick={() => {
            setIsOpened(true)
            onEditClick(() => setIsOpened(false))}
          }
          height={'20px'}
          width={'20px'}
        >
          <MdOutlineEdit/>
        </Button>
        <ConfirmActionPopover
          header={'Выполнить удаление?'}
          onConfirm={onEntityClick}
          onExitComplete={() => setIsOpened(false)}
        >
          <Button
            variant="ghost"
            padding={'0px'}
            height={'20px'}
            width={'20px'}
            onClick={() => {setIsOpened(true)}}
          >
            <MdOutlineDeleteForever/>
          </Button>
        </ConfirmActionPopover>
      </HStack>
     </Box>
  )
}
