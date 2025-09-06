// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type valueof<O extends Record<string, any>> = O[keyof O];
