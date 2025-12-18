'use client'

import {Button, HStack} from "@chakra-ui/react"
import * as React from "react";
import {GrUploadOption} from "react-icons/gr";

export const MeasurementCaseSelectedCollectionTableActionBar: React.FC = () => {
  return (
    <HStack
      justifySelf={'end'}
    >
      <Button
        variant={"solid"}
        onClick={() => {

        }}
      >
        <GrUploadOption />
        Сформировать графики
      </Button >
    </HStack>
  )
}
