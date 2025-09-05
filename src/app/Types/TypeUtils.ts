export type valueof<O extends Record<string, any>> = O[keyof O];
