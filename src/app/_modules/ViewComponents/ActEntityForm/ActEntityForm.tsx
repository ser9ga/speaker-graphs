'use client'

import {Button, Stack} from "@chakra-ui/react"
import {FieldValues, Path, useForm} from "react-hook-form"
import * as React from "react";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {EntityTableColumn} from "@/app/_modules/Types/entityTable";
import {NumericalFormField} from "@/app/_modules/ViewComponents/NumericalFormField/NumericalFormField";
import {TextFormField} from "@/app/_modules/ViewComponents/TextFormField/TextFormField";

interface ActEntityFormProps<T extends FieldValues, N extends Path<T>> {
  values?: T,
  onSave: (values: T) => void
  columns: EntityTableColumn<T, N>[],
  confirmText?: string
  confirmButtonLabel?: string
  onDeleteConfirmPopoverExit?: () => void,
}

export function ActEntityForm<T extends FieldValues, N extends Path<T>> ({
  values,
  onSave,
  columns,
  confirmText,
  confirmButtonLabel,
  onDeleteConfirmPopoverExit
}: ActEntityFormProps<T, N>) {
  const {
    handleSubmit,
    control,
    trigger
  } = useForm<T>({values});

  const onSubmit = handleSubmit((data) => {
    onSave(data)
  })

  const getFieldContent = (
    keyName: Path<T>,
    column: EntityTableColumn<T, N>,
    disabled: boolean
  ) => {
    if (column.fieldType === 'decimal') {
      return (
        <NumericalFormField
          fieldName={keyName}
          fieldLabel={column.label}
          control={control}
          params={{
            disabled,
            suffix: column.suffix,
            width: '80px',
            required: column.required
          }}
        />
      )
    }

    if (column.fieldType === 'textArea') {
      return (
        <TextFormField
          control={control}
          fieldName={keyName}
          fieldLabel={column.label}
          params={{
            disabled,
            required: column.required,
            isTextarea: true,
          }}
        />
      )
    }

    return (
      <TextFormField
        control={control}
        fieldName={keyName}
        fieldLabel={column.label}
        params={{
          disabled,
          required: column.required
        }}
      />
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        {columns
          .filter((column) => column.keyName !== 'id')
          .map((column) => {

          return getFieldContent(column.keyName, column, column.keyName === 'id')
        })}

        <ConfirmActionPopover
          header={confirmText ||'Сохранить?'}
          onConfirm={onSubmit}
          onExitComplete={onDeleteConfirmPopoverExit}
          confirmButtonLabel={confirmButtonLabel || 'Сохранить'}
          beforePopover={trigger}
        >
          <Button alignSelf={'end'}>
            {'Сохранить'}
          </Button>
        </ConfirmActionPopover>
      </Stack>
    </form>
  )
}
