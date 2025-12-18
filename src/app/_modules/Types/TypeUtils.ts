
export type valueof<O extends Record<string, unknown>> = O[keyof O];

export type NullableRecord<T extends Record<string, unknown>> = Record<keyof T, valueof<T> | null>

export type NulledRecord<T extends Record<string, unknown>> = Record<keyof T, null>
