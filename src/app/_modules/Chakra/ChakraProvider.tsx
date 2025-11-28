'use client'

import React from 'react';
import {ChakraProvider as Chakra, defaultSystem} from '@chakra-ui/react';

export const ChakraProvider = ({
  children
}: {
  children: React.ReactNode
})=> {
  return <Chakra value={defaultSystem}>{children}</Chakra>
}
