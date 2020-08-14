import { FormContextProviderValue } from "./FormProvider";
import { FieldChildProps } from ".";
export declare const mapContextToFieldChildProps: <Value>(context: FormContextProviderValue, options: {
    name: string;
    defaultValue?: Value | undefined;
}) => FieldChildProps<Value>;
