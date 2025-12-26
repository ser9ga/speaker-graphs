'use client'

import React, {ReactNode} from 'react';
import {ChakraProvider as Chakra, defaultSystem, LocaleProvider} from '@chakra-ui/react';

export const ChakraProvider = ({
  children
}: {
  children: ReactNode
})=> {
  return (
    <Chakra value={defaultSystem} >
      <LocaleProvider locale={'ru-RU'}>
        {children}
      </LocaleProvider>
    </Chakra>
  )
}
