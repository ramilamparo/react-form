import React, { useContext } from "react";
import { FieldChildProps } from "./Field";
import { FormContext } from "./FormProvider";
import { mapContextToFieldChildProps } from "./utils";

export const useField = <Value,>(
	name: string,
	options: { defaultValue: Value }
): FieldChildProps<Value> => {
	const field = useContext(FormContext);

	const childProps = mapContextToFieldChildProps(field, { name, ...options });

	return childProps;
};
