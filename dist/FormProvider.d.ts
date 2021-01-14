import React, { Component } from "react";
export declare type FieldErrors<Values extends object> = Partial<Record<keyof Values, string>>;
export declare type TouchedFields<Values> = Partial<Record<keyof Values, boolean>>;
export declare type DisabledFields<Values> = Partial<Record<keyof Values, boolean>>;
export interface FormProviderProps<Values extends object, Context extends any = {}> {
    validation?: (value: Values, context?: Context) => FieldErrors<Values>;
    values: Values;
    errors?: FieldErrors<Values>;
    onChange: (value: Values, errors: FieldErrors<Values>, name?: string) => void;
    touched?: TouchedFields<Values>;
    onFieldTouch?: (fields: TouchedFields<Values>, name?: string) => void;
    castOnChange?: boolean;
    validateOnMount?: boolean;
    context?: Context;
    validateOnContextChange?: boolean;
    disabledFields?: DisabledFields<Values>;
}
export interface FormContextProviderValue<Values extends object> {
    values: Values;
    setFieldValue: <Value>(name: string, value: Value) => void;
    setTouchedField: (name: string) => void;
    errors: FieldErrors<Values>;
    touched: TouchedFields<Values>;
    disabled: DisabledFields<Values>;
}
export declare const FormContext: React.Context<FormContextProviderValue<object>>;
export declare const getFormContext: <Values extends object>() => React.Context<FormContextProviderValue<Values>>;
export declare class FormProvider<Values extends object> extends Component<FormProviderProps<Values>> {
    componentDidMount(): void;
    private setFieldValue;
    private setTouchedField;
    private validateForm;
    render(): JSX.Element;
}
