'use client'

import {ChooseFileModal} from "@/app/_modules/ViewComponents/ChooseFileModal/ChooseFileModal";
import {actEntityDialog} from "@/app/_modules/ViewComponents/ActEntityModal/ActEntityModal";
import React from "react";
import {Toaster} from "@/app/_modules/components/ui/toaster";

export const ModalCollection = () => {
  return (
    <>
      <ChooseFileModal />
      <actEntityDialog.Viewport />
      <Toaster />
    </>
  )
}
