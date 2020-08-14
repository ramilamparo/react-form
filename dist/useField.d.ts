import { FieldChildProps } from "./Field";
export declare const useField: <Value>(name: string, options: {
    defaultValue: Value;
}) => FieldChildProps<Value>;
