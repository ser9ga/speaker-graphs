import * as React from "react";
import {Flex, HStack, Table, Text} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {OverlayLoader} from "@/app/_modules/ViewComponents/OverlayLoader/OverlayLoader";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActEntityForm} from "@/app/_modules/ViewComponents/ActEntityForm/ActEntityForm";
import {actEntityDialog} from "@/app/_modules/ViewComponents/ActEntityModal/ActEntityModal";
import {EntityCategory} from "@/app/_modules/Constants/EntityCategory";
import {EntityTableActionBar} from "@/app/_modules/ViewComponents/EntityTableActionBar/EntityTableActionBar";
import {toaster} from "@/app/_modules/components/ui/toaster";

interface EntityTableProps<T extends Record<string, any>> {
  dialogNamePrefix: EntityCategory;
  columns: {
    keyName: string,
    width?: number,
    label: string
  }[]
  entityService: {
    getAll:() => Promise<T[] | Error>;
    add: (entity: Omit<T, 'id'>) => Promise<T | Error>;
    update: (entity: T) => Promise<T | Error>;
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

    if (res?.isError) {
      return;
    }

    setEntities(res)
    setIsLoading(false);
  };

  useEffect(() => {
    getEntities()
  }, []);

  const getDialogFullName = (id: number | 'new') => `${dialogNamePrefix}_${id}`

  const onEntityAdd = async (values: T) => {
    const res = await entityService.add(values);

    if (res?.isError) {
       return;
    }

    await actEntityDialog.close(getDialogFullName('new'))

    await getEntities()
  }

  const onEntityEdit = async (values: T, id: number) => {
    const res = await entityService.update(values);

    if (res?.isError) {
      return;
    }

    await actEntityDialog.close(getDialogFullName(id))

    await getEntities()
  }

  const onEntityDelete = async (id: number) => {
    const res = await entityService.remove(id);

    if (res?.isError) {
      return;
    }

    await getEntities()
  }

  return (
    <OverlayLoader isLoading={isLoading}>
      <Flex
        justifyContent={'start'}
        alignItems={'end'}
        direction={'column'}
        gap={'10px'}
      >
        <EntityTableActionBar
          onAddClick={() => {
            actEntityDialog.open(getDialogFullName('new'), {
              title: 'Создание',
              content: (
                <ActEntityForm
                  onSave={(values: T) => onEntityAdd(values)}
                  columns={columns}
                  confirmText={'Подтвердить создание?'}
                  confirmButtonLabel={'Подтвердить'}
                />
              ),
            })
          }}
        />
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
                                      confirmText={'Сохранить изменения?'}
                                      confirmButtonLabel={'Сохранить'}
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
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Flex>
    </OverlayLoader>
  )
}
