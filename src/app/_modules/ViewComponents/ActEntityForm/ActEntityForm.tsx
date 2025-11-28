"use client"

import {Button, Field, Input, Stack} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import {ReactNode} from "react";
import {ConfirmActionPopover} from "@/app/_modules/ViewComponents/ConfirmActionPopover/ConfirmActionPopover";
import {ValueOf} from "next/constants";

interface ActEntityFormProps<T> {
  values: T,
  onSave: (values: T) => void
  columns: {
    keyName: string
    label: string
  }[],
  onDeleteConfirmPopoverExit?: () => void,
}

export function ActEntityForm<T extends Record<string, any>> ({
  values,
  onSave,
  columns,
  onDeleteConfirmPopoverExit
}: ActEntityFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({values});

  const onSubmit = handleSubmit((data) => {
    onSave(data)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        {columns.map((item) => {
          return (
            <Field.Root
              key={item.keyName}
              invalid={!!errors[item.keyName]}
              disabled={item.keyName === 'id'}
            >
              <Field.Label>
                {item.label}
              </Field.Label>
              <Input {...register(item.keyName as ValueOf<T>)} />
              <Field.ErrorText>
                {errors[item.keyName]?.message as ReactNode}
              </Field.ErrorText>
            </Field.Root>
          )
        })}
        <ConfirmActionPopover
          header={'Сохранить изменения?'}
          onConfirm={onSubmit}
          onExitComplete={onDeleteConfirmPopoverExit}
        >
          <Button alignSelf={'end'}>
            Сохранить
          </Button>
        </ConfirmActionPopover>
      </Stack>
    </form>
  )
}
