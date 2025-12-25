'use client'

import React, {ReactNode} from 'react';
import {ChakraProvider as Chakra, defaultSystem} from '@chakra-ui/react';

export const ChakraProvider = ({
  children
}: {
  children: ReactNode
})=> {
  return <Chakra value={defaultSystem}>{children}</Chakra>
}
