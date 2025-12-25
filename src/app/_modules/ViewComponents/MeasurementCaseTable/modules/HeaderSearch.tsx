import React from 'react'

import {Updater,} from '@tanstack/react-table'
import {Input} from "@chakra-ui/react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      size={'xs'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export const HeaderSearch = ({
  getFilterValue,
  setFilterValue
}: {
  getFilterValue: () => unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilterValue: (updater: Updater<any>) => void
}) => {
  return (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => setFilterValue(value)}
      placeholder={'Поиск'}
      type="text"
      value={(getFilterValue() ?? '') as string}
    />
  )
}
