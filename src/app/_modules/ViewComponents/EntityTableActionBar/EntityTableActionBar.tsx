"use client"

import {Button, VStack} from "@chakra-ui/react"
import * as React from "react";
import {IoIosAdd} from "react-icons/io";

interface Props {
  onAddClick: () => void
}

export const EntityTableActionBar: React.FC<Props> = ({
  onAddClick
}) => {
  return (
    <VStack >
      <Button
        variant={"solid"}
        onClick={() => onAddClick()}
      >
        <IoIosAdd />
        Создать
      </Button >
    </VStack>
  )
}
