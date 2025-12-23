'use client'

import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import React from "react";
import {Toaster} from "@/app/_modules/components/ui/toaster";
import {importFilesDialog} from "@/app/_modules/ViewComponents/ImportFilesDialog/ImportFilesDialog";
import {errorListDrawer} from "@/app/_modules/ViewComponents/ErrorListDrawer/ErrorListDrawer";

export const ModalCollection = () => {
  return (
    <>
      <commonDialog.Viewport />
      <importFilesDialog.Viewport />
      <errorListDrawer.Viewport />
      <Toaster />
    </>
  )
}
