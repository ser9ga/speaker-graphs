import React from 'react';
import {TabContainer} from '@/app/_modules/ViewComponents/TabContainer/TabContainer';
import {ModalCollection} from "@/app/_modules/ViewComponents/ModalCollection/ModalCollection";

export const MainAppContainer = async () => {
  return (
    <>
      <TabContainer />
      <ModalCollection />
    </>
  );
}
