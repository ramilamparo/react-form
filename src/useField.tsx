import { useContext } from "react";
import { FieldChildProps, mapContextToFieldChildProps } from "./Field";
import { getFormContext } from "./FormProvider";

export const useField = <Values extends object>(
	name: string,
	options: { defaultValue: Values }
): FieldChildProps<Values> => {
	const field = useContext(getFormContext<Values>());

	const childProps = mapContextToFieldChildProps(field, { name, ...options });

	return childProps;
};
