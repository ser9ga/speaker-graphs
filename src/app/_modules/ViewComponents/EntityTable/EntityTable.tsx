import * as React from "react";
import {HStack, Table, Text, VStack} from '@chakra-ui/react';
import {OverlayLoader} from "@/app/_modules/ViewComponents/OverlayLoader/OverlayLoader";
import {ActEntityForm} from "@/app/_modules/ViewComponents/ActEntityForm/ActEntityForm";
import {commonDialog} from "@/app/_modules/ViewComponents/CommonDialog/CommonDialog";
import {EntityTableActionBar} from "@/app/_modules/ViewComponents/EntityTableActionBar/EntityTableActionBar";
import {EntityTableColumn} from "@/app/_modules/Types/entityTable";
import {FieldValues, Path} from "react-hook-form";
import {EntityActionTableCell} from "@/app/_modules/ViewComponents/EntityActionTableCell/EntityActionTableCell";
import {EntityName} from "@/app/_modules/Constants/EntityName";
import {getDialogFullNameFactory} from "@/app/_modules/Utils/getDialogFullName";

interface EntityTableProps<T extends FieldValues, N extends Path<T>> {
  dialogNamePrefix: EntityName;
  columns: EntityTableColumn<T, N>[]
  entities: T[] | undefined
  onEntityAdd: (values: Omit<T, 'id'>, callback?: () => void) => void
  onEntityEdit: (values: T, callback?: () => void) => void
  onEntityDelete: (id: T['id'], callback?: () => void) => void
  isLoading: boolean
}

export function EntityTable<T extends FieldValues, N extends Path<T>> ({
  entities,
  dialogNamePrefix,
  columns,
  onEntityAdd,
  onEntityEdit,
  onEntityDelete,
  isLoading
}: EntityTableProps<T, N> ) {
  const getDialogFullName = getDialogFullNameFactory(dialogNamePrefix)

  return (
    <OverlayLoader isLoading={isLoading}>
      <VStack
        justifyContent={'start'}
        alignItems={'end'}
        gap={'10px'}
      >
        <EntityTableActionBar
          onAddClick={() => {
            const dialogId = getDialogFullName('new');

            return (
              commonDialog.open(
                dialogId,
                {
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
                      onSave={(value) => onEntityAdd(value, () => commonDialog.close(dialogId))}
                      columns={columns}
                      confirmText={'Подтвердить создание?'}
                      confirmButtonLabel={'Подтвердить'}
                    />
                  ),
                }
              )
            )
          }}
        />
        <Table.Root
          width="100%"
          interactive
          css={{
            "table-layout": 'fixed'
          }}
        >
          <Table.Header>
            <Table.Row>
              {columns.map((column) => {
                return (
                  <Table.ColumnHeader
                    key={column.keyName}
                    padding={'6px'}
                    {...(column.width && {width: `${column.width}px`})}
                  >
                    {column.label}
                  </Table.ColumnHeader>
                )
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entities?.map((entity) => {
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
                                const dialogId = getDialogFullName(entity.id);

                                return (
                                  commonDialog.open(
                                    dialogId,
                                    {
                                      title: `Редактирование ${entity.label}`,
                                      content: (
                                        <ActEntityForm
                                          values={entity}
                                          onSave={(value) => {
                                            onEntityEdit(value, () => commonDialog.close(dialogId))
                                          }}
                                          columns={columns}
                                          onDeleteConfirmPopoverExit={exitCallback}
                                          confirmText={'Сохранить изменения?'}
                                          confirmButtonLabel={'Сохранить'}
                                        />
                                      ),
                                      exitCallback
                                    }
                                  )
                                )
                              }}
                              onDeleteClick={(callback) => onEntityDelete(entity.id, callback)}
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
                        padding={'6px'}
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
      </VStack>
    </OverlayLoader>
  )
}
