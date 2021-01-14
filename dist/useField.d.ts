import { FieldChildProps } from "./Field";
export declare const useField: <FieldValue, FormValues extends object = object>(name: string, options: {
    defaultValue: FieldValue;
}) => FieldChildProps<FieldValue>;
