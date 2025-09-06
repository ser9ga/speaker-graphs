'use client'

import {ReactNode, useState} from 'react';
import { Collapsible, IconButton, Stack } from '@chakra-ui/react';
import { IoIosMenu } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';
import { HiOutlineArrowsPointingIn, HiOutlineArrowsPointingOut } from 'react-icons/hi2';

interface DiagramBlockMenuProps {
  buttonCollection: ReactNode | ReactNode[], // TODO
  toggleGraphExpansion: () => void,
  isGraphExpanded: boolean
}

export const DiagramBlockMenu = ({
  buttonCollection,
  toggleGraphExpansion,
  isGraphExpanded
}: DiagramBlockMenuProps) => {
  const [isIconMenuExpanded, setIsIconMenuExpanded] = useState(false)

  const expandButton = (
    <IconButton onClick={() => toggleGraphExpansion?.()}>
      {isGraphExpanded
        ? <HiOutlineArrowsPointingIn />
        : <HiOutlineArrowsPointingOut />
      }
    </IconButton>
  )

  if(!buttonCollection) {
    return expandButton
  }

  return (
    <Collapsible.Root
      onOpenChange={(params: {open: boolean}) => setIsIconMenuExpanded(params.open)}
      open={isIconMenuExpanded}
    >
      <Collapsible.Trigger paddingBottom="2">
        <IconButton asChild>
          {isIconMenuExpanded
            ? <VscChromeClose />
            : <IoIosMenu />
          }
        </IconButton>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack>
          {expandButton}
          {buttonCollection}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
