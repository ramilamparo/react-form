import { useContext } from "react";
import { FieldChildProps, useContextToFieldChildProps } from "./Field";
import { getFormContext } from "./FormProvider";

export const useField = <FieldValue, FormValues extends object = object>(
	name: string,
	options: { defaultValue: FieldValue }
): FieldChildProps<FieldValue> => {
	const field = useContext(getFormContext<FormValues>());

	const childProps = useContextToFieldChildProps(field, { name, ...options });

	return childProps;
};
