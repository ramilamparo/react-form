import React, { ReactElement } from "react";
export interface FieldChildProps<Value> {
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
    disabled: boolean;
    disabledFields: {
        [key: string]: boolean;
    };
}
export interface FieldProps<Value> {
    name: string;
    defaultValue?: any;
    children: (props: FieldChildProps<Value>) => ReactElement | null;
}
export declare const Field: <Value>({ children, name, defaultValue }: FieldProps<Value>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
