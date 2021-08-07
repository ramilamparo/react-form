import { ReactElement } from "react";
import { FormContextProviderValue, FieldErrors, DisabledFields, TouchedFields } from "./FormProvider";
export interface FieldChildProps<Value> {
    value: Value;
    setFieldValue: (value: Value) => void;
    onBlur: () => void;
    error: string | undefined;
    touched: boolean;
    touchedFields: TouchedFields<object>;
    errors: FieldErrors<object>;
    values: {
        [key: string]: any;
    };
    disabled: boolean;
    disabledFields: DisabledFields<object>;
}
export interface FieldProps<Value> {
    name: string;
    defaultValue?: any;
    children: (props: FieldChildProps<Value>) => ReactElement | null;
}
export declare const useContextToFieldChildProps: <FieldValue, FormValues extends object>(context: FormContextProviderValue<FormValues>, options: {
    name: string;
    defaultValue?: FieldValue | undefined;
}) => FieldChildProps<FieldValue>;
export declare const Field: <Value>({ children, name, defaultValue }: FieldProps<Value>) => ReactElement | null;
