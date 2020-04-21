import React, { ReactElement } from "react";
interface FieldChildProps<Value> {
    value: Value;
    setFieldValue: (value: Value) => void;
    onBlur: () => void;
    error: string | undefined;
    touched: boolean;
    touchedFields: {
        [key: string]: boolean;
    };
    errors: {
        [key: string]: string;
    };
    values: {
        [key: string]: any;
    };
}
export interface InputProps<Value> {
    name: string;
    transformer?: (value: Value) => Value;
    helperText?: string;
    className?: string;
    label?: string;
}
export interface FieldProps<Value> {
    name: string;
    defaultValue?: any;
    children: (props: FieldChildProps<Value>) => ReactElement | null;
}
export declare const Field: <Value>({ children, name, defaultValue, }: FieldProps<Value>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export {};
