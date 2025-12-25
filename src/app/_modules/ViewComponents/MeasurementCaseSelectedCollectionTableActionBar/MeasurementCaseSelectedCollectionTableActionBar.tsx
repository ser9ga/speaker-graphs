'use client'

import * as React from "react";
import {Button, HStack} from "@chakra-ui/react"
import {MdOutlineCleaningServices} from "react-icons/md";
import {GoGraph} from "react-icons/go";

interface MeasurementCaseSelectedCollectionTableActionBarProps {
  onDrawClick: () => void
  onEraseClick: () => void
  isEraseDisabled?: boolean
}

export const MeasurementCaseSelectedCollectionTableActionBar: React.FC<MeasurementCaseSelectedCollectionTableActionBarProps> = ({
  onDrawClick,
  onEraseClick,
  isEraseDisabled
}) => {
  return (
    <HStack
      justifySelf={'end'}
    >
      <Button
        variant={"outline"}
        onClick={() => onEraseClick()}
        disabled={isEraseDisabled}
      >
        <MdOutlineCleaningServices />
        Очитить выбор
      </Button >
      <Button
        variant={"solid"}
        onClick={() => onDrawClick()}
      >
        <GoGraph />
        Сформировать графики
      </Button >
    </HStack>
  )
}
