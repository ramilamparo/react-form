import React, { Component } from "react";
import { ObjectSchema } from "yup";
export declare type FieldErrors<Values extends object> = Partial<Record<keyof Values, string>>;
export declare type TouchedFields<Values> = Partial<Record<keyof Values, boolean>>;
export interface FormProviderProps<Values extends object, Context extends any = {}> {
    validationSchema?: ObjectSchema<Values> | ((value: Values, context?: Context) => void);
    values: Values;
    errors?: FieldErrors<Values>;
    onChange: (value: Values, errors: FieldErrors<Values>, name?: string) => void;
    touched?: TouchedFields<Values>;
    onFieldTouch?: (fields: TouchedFields<Values>, name?: string) => void;
    castOnChange?: boolean;
    validateOnMount?: boolean;
    context?: Context;
    validateOnContextChange?: boolean;
}
interface FormContextProviderValue {
    values: object;
    setFieldValue: (name: string, value: any) => void;
    setTouchedField: (name: string) => void;
    errors: FieldErrors<object>;
    touched: TouchedFields<object>;
}
export declare const FormContext: React.Context<FormContextProviderValue>;
export declare class FormProvider<Values extends object> extends Component<FormProviderProps<Values>> {
    componentDidMount(): void;
    private setFieldValue;
    private setTouchedField;
    private validateForm;
    private getFieldErrors;
    render(): JSX.Element;
}
export {};
