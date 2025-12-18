'use client'

import {ChooseFileModal} from "@/app/_modules/ViewComponents/ChooseFileModal/ChooseFileModal";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import React from "react";
import {Toaster} from "@/app/_modules/components/ui/toaster";
import {
  importSingleFileInFormDialog
} from "@/app/_modules/ViewComponents/ImportSingleFileInFormDialog/ImportSingleFileInFormDialog";

export const ModalCollection = () => {
  return (
    <>
      <ChooseFileModal />
      <commonDialog.Viewport />
      <importSingleFileInFormDialog.Viewport />
      <Toaster />
    </>
  )
}
