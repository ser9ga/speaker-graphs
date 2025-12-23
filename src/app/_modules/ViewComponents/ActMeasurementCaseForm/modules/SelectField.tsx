import {Control, Controller, FieldValues, Path} from "react-hook-form"
import * as React from "react";
import {useMemo} from "react";
import {createListCollection, Field, Select} from "@chakra-ui/react";

type SelectFieldProps<C extends {id: number}[], T extends FieldValues, N extends Path<T>> = {
  collection: C;
  fieldName: N
  fieldLabel: string,
  control: Control<T, unknown, T>
  getItemLabel: (collectionItem: C[number]) => string;
}

export function SelectField<C extends {id: number}[], T extends FieldValues, N extends Path<T>> ({
  collection,
  fieldName,
  fieldLabel,
  control,
  getItemLabel
}: SelectFieldProps<C, T, N>) {
  const frameworks = useMemo(
    () => createListCollection({
      items: collection.map((item) => ({
          value: item.id.toString(),
          label: getItemLabel(item),
          full: item
        }))
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection]
  )

  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
        required: true,
      }}
      render={({
        field: {
          onChange,
          value
        },
        fieldState: {error}
      }) => (
        <Field.Root invalid={!!error}>
          <Field.Label
            paddingLeft={'5px'}
            {...(!!error && {color: 'red'})}
          >
            {fieldLabel}
          </Field.Label>
          <Select.Root
            collection={frameworks}
            value={value ? [value.id.toString()] : []}
            onValueChange={(e) => onChange(e.items?.[0].full)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {frameworks
                  .items
                  .map((framework) => (
                    <Select.Item
                      item={framework}
                      key={framework.value}
                    >
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))
                }
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </Field.Root>
      )}
    />
  )
}
