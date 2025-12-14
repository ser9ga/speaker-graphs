"use client"

import {Button, HStack} from "@chakra-ui/react"
import * as React from "react";
import {IoIosAdd} from "react-icons/io";

interface Props {
  onAddClick: () => void
}

export const MeasurementCaseCollectionTableActionBar: React.FC<Props> = ({
  onAddClick
}) => {
  return (
    <HStack >
      <Button
        variant={"solid"}
        onClick={() => onAddClick()}
      >
        <IoIosAdd />
        Создать
      </Button >
      <Button
        variant={"solid"}
        onClick={() => onAddClick()}
        disabled
      >
        <IoIosAdd />
        Импортировать
      </Button >
      <Button
        variant={"solid"}
        onClick={() => onAddClick()}
        disabled
      >
        <IoIosAdd />
        Удалить
      </Button >
    </HStack>
  )
}
