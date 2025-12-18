export function _exhaustiveCheck(param: never): never;
export function _exhaustiveCheck<T>(param: never, fallBack: T): T;

export function _exhaustiveCheck<T>(
  param: never,
  options?: {
    fallBack?: T
    errorMessage?: string
    onErrorCallback?: () => unknown
  }) {
  if (options?.fallBack !== undefined) {
    return options?.fallBack;
  }

  if (options?.onErrorCallback) {
    options?.onErrorCallback()
  } else {
    throw new Error(options?.errorMessage || 'should not reach here');
  }
}
