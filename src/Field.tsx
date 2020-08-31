import React, { ReactElement } from "react";
import get from "lodash.get";
import { FormContext, FormContextProviderValue } from "./FormProvider";

export interface FieldChildProps<Value> {
	value: Value;
	setFieldValue: (value: Value) => void;
	onBlur: () => void;
	error: string | undefined;
	touched: boolean;
	touchedFields: { [key: string]: boolean };
	errors: { [key: string]: string };
	values: { [key: string]: any };
	disabled: boolean;
	disabledFields: { [key: string]: boolean };
}

export interface FieldProps<Value> {
	name: string;
	defaultValue?: any;
	children: (props: FieldChildProps<Value>) => ReactElement | null;
}

export const mapContextToFieldChildProps = <Value,>(
	context: FormContextProviderValue<object>,
	options: {
		name: string;
		defaultValue?: Value;
	}
): FieldChildProps<Value> => {
	const {
		values,
		setFieldValue,
		setTouchedField,
		errors,
		touched: touchedFields,
		disabled: disabledFields
	} = context;
	const { name, defaultValue } = options;
	const value = get(values, name);
	const error = get(errors, name);
	const touched = get(touchedFields, name);
	const disabled = get(disabledFields, name);
	const childProps: FieldChildProps<Value> = {
		value: value === undefined ? defaultValue : value,
		setFieldValue: (newValue: Value) => setFieldValue(name, newValue),
		onBlur: () => setTouchedField(name),
		error,
		values,
		errors,
		touched,
		touchedFields,
		disabled,
		disabledFields
	};
	return childProps;
};

export const Field = <Value,>({
	children,
	name,
	defaultValue
}: FieldProps<Value>): ReactElement => {
	return (
		<FormContext.Consumer>
			{(props) => {
				return children(
					mapContextToFieldChildProps<Value>(props, {
						name,
						defaultValue
					})
				);
			}}
		</FormContext.Consumer>
	);
};
