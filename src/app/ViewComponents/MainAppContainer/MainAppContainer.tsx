'use client'

import React from 'react';
import {Provider} from 'react-redux';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import {TabContainer} from '@/app/ViewComponents/TabContainer/TabContainer';
import {store} from '@/app/Store/Store';
import {ChooseFileModal} from "@/app/ViewComponents/ChooseFileModal/ChooseFileModal";

export const MainAppContainer = () => {
  return (
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <TabContainer />
        <ChooseFileModal/>
      </ChakraProvider>
    </Provider>
  );
}
