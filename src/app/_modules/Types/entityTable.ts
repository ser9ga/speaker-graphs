import {FieldValues, Path} from "react-hook-form";

export type EntityTableColumn<T extends FieldValues, N extends Path<T>> = {
    keyName: N,
    label: string,
    width?: number,
    fieldType?: 'text' | 'decimal' | 'textArea',
    suffix?: string,
    required?: boolean,
}
