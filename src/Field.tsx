import React, { FC, ReactElement } from "react";
import _ from "lodash";

import { FormContext } from ".";

interface FieldChildProps<Value> {
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

export interface InputProps<Value> {
	name: string;
	transformer?: (value: Value) => Value;
	helperText?: string;
	className?: string;
	label?: string;
}

export interface FieldProps<Value> {
	name: string;
	defaultValue?: any;
	children: (props: FieldChildProps<Value>) => ReactElement | null;
}

export const Field = <Value,>({
	children,
	name,
	defaultValue
}: FieldProps<Value>): ReactElement => {
	return (
		<FormContext.Consumer>
			{({
				values,
				setFieldValue,
				setTouchedField,
				errors,
				touched: touchedFields,
				disabled: disabledFields
			}) => {
				const value = _.get(values, name);
				const error = _.get(errors, name);
				const touched = _.get(touchedFields, name);
				const disabled = _.get(disabledFields, name);
				const childProps: FieldChildProps<Value> = {
					value: value === undefined ? defaultValue : value,
					setFieldValue: (value: Value) => setFieldValue(name, value),
					onBlur: () => setTouchedField(name),
					error,
					values,
					errors,
					touched,
					touchedFields,
					disabled,
					disabledFields
				};
				return children(childProps);
			}}
		</FormContext.Consumer>
	);
};
