import React from 'react'
import {createListCollection, Portal, Select} from "@chakra-ui/react";
import {DOOR_STATE_NAME, MEASUREMENT_CASE_TABLE_COLUMN_NAME} from "@/app/_modules/Constants";
import {_exhaustiveCheck} from "@/app/_modules/Utils/Common";
import {DOOR_STATE_LABEL} from "@/app/_modules/Constants/Translations/DoorStateLabel";
import {Updater} from "@tanstack/react-table";

export const HeaderSelect = ({
  accessorKey,
  getFacetedUniqueValues,
  getFilterValue,
  setFilterValue,
}: {
  accessorKey: string
  getFacetedUniqueValues: () => Map<any, number>
  getFilterValue: () => unknown
  setFilterValue: (updater: Updater<any>) => void
})=> {
  // @ts-ignore
  const isDoorColumn = accessorKey === MEASUREMENT_CASE_TABLE_COLUMN_NAME.IS_DOOR_OPENED;
  // @ts-ignore

  const frameworks = React.useMemo(
    () => {
      return createListCollection({
        items: Array.from(getFacetedUniqueValues().keys())
          .sort()
          .map((cellRawValue) => {
            if (isDoorColumn) {
              const getSegmentValue = (segmentValue: boolean) => {
                switch (segmentValue) {
                  case true: return DOOR_STATE_LABEL[DOOR_STATE_NAME.OPENED];
                  case false: return DOOR_STATE_LABEL[DOOR_STATE_NAME.CLOSED];

                  default: _exhaustiveCheck(segmentValue, {fallBack: ''});
                }
              }

              return {
                label: getSegmentValue(cellRawValue),
                value: cellRawValue,
              }
            }

            return {
              label: cellRawValue,
              value: cellRawValue,
            }
          })
      })
    },
    [getFacetedUniqueValues()],
  );

  const filterValue = getFilterValue() as (string[] | undefined);

  frameworks.items.map((framework) => {
    return (
      <Select.Item item={framework} key={framework.value}>
        {framework.label}
        <Select.ItemIndicator />
      </Select.Item>
    )}
  )

  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      multiple
      onValueChange={(e) => {
        setFilterValue(e.value)
      }}
      value={filterValue || []}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => {
              return (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            )}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
