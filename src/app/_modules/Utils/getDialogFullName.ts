export const getDialogFullNameFactory = (dialogNamePrefix: string) => {
  return (id: number | 'new') => `${dialogNamePrefix}_${id}`
}
