import {Box, Center, Spinner} from "@chakra-ui/react"
import React, {FC, ReactNode} from "react";

interface SpinnerWrapperProps {
  isSpinning: boolean,
  children?: ReactNode
}

export const SpinnerWrapper: FC<SpinnerWrapperProps> = ({isSpinning, children}) => {
  return (
    <Box
      height={'100%'}
      width={'100%'}
      minHeight={'0px'}
      minWidth={'0px'}
      position="relative"
      aria-busy="true"
      userSelect="none"
    >
      {children}
      {isSpinning && (
        <Box
          pos="absolute"
          inset="0"
          bg="bg/80"
        >
          <Center h="full">
            <Spinner color="teal.500" size="lg" />
          </Center>
        </Box>
      )}
    </Box>
  )
}
