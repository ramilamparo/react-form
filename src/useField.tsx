import { useContext } from "react";
import { FieldChildProps, mapContextToFieldChildProps } from "./Field";
import { getFormContext } from "./FormProvider";

export const useField = <FieldValue, FormValues extends object = object>(
	name: string,
	options: { defaultValue: FieldValue }
): FieldChildProps<FieldValue> => {
	const field = useContext(getFormContext<FormValues>());

	const childProps = mapContextToFieldChildProps(field, { name, ...options });

	return childProps;
};
