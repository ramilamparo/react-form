import { Dispatch, SetStateAction } from "react";
import { FieldErrors, TouchedFields } from "./FormProvider";
import { PreviousValue } from "./usePrevious";
export interface UseFormStateOptionsBase<Values extends object> {
    errors?: FieldErrors<Values>;
    touched?: TouchedFields<Values>;
    formErrors?: string[];
}
export interface UseFormStateOptions<Values extends object> extends UseFormStateOptionsBase<Values> {
    values: Values;
}
export interface UseNullableFormStateOptions<Values extends object> extends UseFormStateOptionsBase<Values> {
    values: Values | null;
}
export interface UseFormStateReturnBase<Values extends object> {
    setValues: Dispatch<SetStateAction<Values>>;
    errors: FieldErrors<Values>;
    setErrors: Dispatch<SetStateAction<FieldErrors<Values>>>;
    touched: TouchedFields<Values>;
    setTouched: Dispatch<SetStateAction<TouchedFields<Values>>>;
    formErrors: string[];
    setFormErrors: Dispatch<SetStateAction<string[]>>;
    hasErrors: boolean;
    previousErrors: PreviousValue<FieldErrors<Values>>;
    previousTouched: PreviousValue<TouchedFields<Values>>;
    previousFormErrors: PreviousValue<string[]>;
}
export interface UseFormStateReturn<Values extends object> extends UseFormStateReturnBase<Values> {
    values: Values;
    previousValues: PreviousValue<Values>;
}
export interface UseNullableFormStateReturn<Values extends object> extends UseFormStateReturnBase<Values> {
    values: Values | null;
    previousValues: PreviousValue<Values | null>;
}
export interface UseFormStateFunction {
    <Values extends object>(options: UseFormStateOptions<Values>): UseFormStateReturn<Values>;
    <Values extends object>(options: UseNullableFormStateOptions<Values>): UseNullableFormStateReturn<Values>;
}
export declare const useFormState: UseFormStateFunction;
