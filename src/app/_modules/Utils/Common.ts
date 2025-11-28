export function _exhaustiveCheck(param: never): never;
export function _exhaustiveCheck<T>(param: never, fallBack: T): T;

export function _exhaustiveCheck<T>(
  param: never,
  options?: {
    fallBack?: T
    errorMessage?: string
  }) {
  if (options?.fallBack !== undefined) {
    return options?.fallBack;
  }

  throw new Error(options?.errorMessage || 'should not reach here');
}
