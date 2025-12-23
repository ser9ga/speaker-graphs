import * as React from "react";
import {useEffect, useState} from "react";
import {Flex, HStack, Table, Text} from '@chakra-ui/react';
import {OverlayLoader} from "@/app/_modules/ViewComponents/OverlayLoader/OverlayLoader";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {ActEntityForm} from "@/app/_modules/ViewComponents/ActEntityForm/ActEntityForm";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityCategoryName} from "@/app/_modules/Constants/EntityCategoryName";
import {EntityTableActionBar} from "@/app/_modules/ViewComponents/EntityTableActionBar/EntityTableActionBar";
import {toaster} from "@/app/_modules/components/ui/toaster";
import {EntityTableColumn} from "@/app/_modules/Types/entityTable";
import {FieldValues, Path} from "react-hook-form";

interface EntityTableProps<T extends FieldValues, N extends Path<T>> {
  dialogNamePrefix: EntityCategoryName;
  columns: EntityTableColumn<T, N>[]
  entityService: {
    getAll:() => Promise<T[] | Error>;
    add: (entity: Omit<T, 'id'>) => Promise<T | Error>;
    update: (entity: T) => Promise<T | Error>;
    remove: (entityId: number) => Promise<void>;
  }
}

export function EntityTable<T extends FieldValues, N extends Path<T>> ({
  dialogNamePrefix,
  columns,
  entityService
}: EntityTableProps<T, N> ) {
  const [entities, setEntities] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getEntities = async () => {
    setIsLoading(true);
    const res = await entityService.getAll();

    // @ts-ignore
    if (res?.isError) {
      return;
    }
    // @ts-ignore
    setEntities(res)
    setIsLoading(false);
  };

  useEffect(() => {
    getEntities()
  }, []);

  const getDialogFullName = (id: number | 'new') => `${dialogNamePrefix}_${id}`

  const onEntityAdd = async (values: T) => {
    const res = await entityService.add(values);

    // @ts-ignore
    if (res?.isError) {
       return;
    }

    toaster.create({
      title: `${dialogNamePrefix} успешно создан`,
      type: "success",
    })

    await commonDialog.close(getDialogFullName('new'))

    await getEntities()
  }

  const onEntityEdit = async (id: number, values: T) => {
    const res = await entityService.update(values);

    // @ts-ignore
    if (res?.isError) {
      return;
    }

    toaster.create({
      title: `${dialogNamePrefix} успешно изменён`,
      type: "success",
    })

    await commonDialog.close(getDialogFullName(id))

    await getEntities()
  }

  const onEntityDelete = async (id: number) => {
    const res = await entityService.remove(id);

    // @ts-ignore
    if (res?.isError) {
      return;
    }

    toaster.create({
      title: `${dialogNamePrefix} успешно удалён`,
      type: "success",
    })

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
            commonDialog.open(getDialogFullName('new'), {
              title: 'Создание',
              content: (
                <ActEntityForm
                  values={columns.reduce((acc, column) => {
                    if (column.keyName === 'id') {
                      return acc
                    }

                    return {
                      ...acc,
                      [column.keyName]: null
                    }
                  }, {} as T)}
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
            {entities.map((entity) => {
              return (
                <Table.Row key={entity.id}>
                  {columns.map((column) => {
                    const getCellContent = (value: string) => {
                      if (column.keyName === 'id') {
                        return (
                          <HStack gap={0}>
                            <Text
                              {...(column.width && {width: `${column.width - 30}px`})}
                              textStyle="sm"
                              truncate
                            >
                              {value}
                            </Text>
                            <EntityActionTableCell
                              onEditClick={(exitCallback) => {
                                commonDialog.open(getDialogFullName(entity.id), {
                                  title: `Редактирование ${entity.label}`,
                                  content: (
                                    <ActEntityForm
                                      values={entity}
                                      onSave={(values: T) => onEntityEdit(entity.id, values, )}
                                      columns={columns}
                                      onDeleteConfirmPopoverExit={exitCallback}
                                      confirmText={'Сохранить изменения?'}
                                      confirmButtonLabel={'Сохранить'}
                                    />
                                  ),
                                  exitCallback
                                })
                              }}
                              onEntityClick={() => onEntityDelete(entity.id)}
                            />
                          </HStack>
                        )
                      }

                      return (
                        <Text
                          {...(column.width && {width: `${column.width - 30}px`})}
                          textStyle="sm"
                          truncate
                        >
                          {value}
                        </Text>
                      )
                    }

                    return (
                      <Table.Cell
                        key={column.keyName}
                        {...(column.width && {width: `${column.width}px`})}
                      >
                        {getCellContent(entity[column.keyName])}
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
