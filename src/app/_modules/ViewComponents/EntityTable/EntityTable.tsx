import * as React from "react";
import {HStack, Table, Text} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {OverlayLoader} from "@/app/_modules/ViewComponents/OverlayLoader/OverlayLoader";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActEntityForm} from "@/app/_modules/ViewComponents/ActEntityForm/ActEntityForm";
import {actEntityDialog} from "@/app/_modules/ViewComponents/ActEntityModal/ActEntityModal";
import {EntityCategory} from "@/app/_modules/Constants/EntityCategory";

interface EntityTableProps<T extends Record<string, any>> {
  dialogNamePrefix: EntityCategory;
  columns: {
    keyName: string,
    width?: number,
    label: string
  }[]
  entityService: {
    getAll:() => Promise<T[]>;
    add: (entity: Omit<T, 'id'>) => Promise<T | undefined>;
    update: (entity: T) => Promise<T | undefined>;
    remove: (entityId: number) => Promise<void>;
  }
}

export function EntityTable<T extends Record<string, any>> ({
  dialogNamePrefix,
  columns,
  entityService
}: EntityTableProps<T> ) {
  const [entities, setEntities] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getEntities = async () => {
    setIsLoading(true);
    const res = await entityService.getAll();
    setEntities(res)
    setIsLoading(false);
  };

  useEffect(() => {
    getEntities()
  }, []);

  const getDialogFullName = (id: number) => `${dialogNamePrefix}_${id}`

  const onEntityEdit = async (values: T, id: number) => {
    await entityService.update(values)
    await actEntityDialog.close(getDialogFullName(id))

    await getEntities()
  }

  const onEntityDelete = async (id: number) => {
    await entityService.remove(id)

    await getEntities()
  }

  return (
    <OverlayLoader isLoading={isLoading}>
      <Table.Root
        width="100%"
        interactive
      >
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              return (
                <Table.ColumnHeader
                  key={column.keyName}
                  {...(column.width && {width: `${column.width}px`})}
                >
                  {column.label}
                </Table.ColumnHeader>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {entities.map((item) => {
            const entityLabel = item.label

            return (
              <Table.Row key={item.id}>
                {columns.map((column) => {
                  const getCellContent = (child: React.ReactNode) => {
                    if (column.keyName === 'id') {
                      return (
                        <HStack gap={0}>
                          {child}
                          <EntityActionTableCell
                            onEditClick={(exitCallback) => {
                              actEntityDialog.open(getDialogFullName(item.id), {
                                title: `Редактирование ${entityLabel}`,
                                content: (
                                  <ActEntityForm
                                    values={item}
                                    onSave={(values: T) => onEntityEdit(values, item.id)}
                                    columns={columns}
                                    onDeleteConfirmPopoverExit={exitCallback}
                                  />
                                ),
                                exitCallback
                              })
                            }}
                            onEntityDelete={() => onEntityDelete(item.id)}
                          />
                        </HStack>
                      )
                    }

                    return child
                  }

                  return (
                    <Table.Cell
                      key={column.keyName}
                      {...(column.width && {width: `${column.width}px`})}
                    >
                      {getCellContent(<Text
                        {...(column.width && {width: `${column.width - 30}px`})}
                        textStyle="sm"
                        truncate
                      >
                        {item[column.keyName]}
                      </Text>)}
                    </Table.Cell>
                  )
                })
                }
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </OverlayLoader>
  )
}
