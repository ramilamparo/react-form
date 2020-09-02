import React, { ReactElement } from "react";
import get from "lodash.get";
import {
	FormContext,
	FormContextProviderValue,
	FieldErrors,
	DisabledFields,
	TouchedFields
} from "./FormProvider";

export interface FieldChildProps<Value> {
	value: Value;
	setFieldValue: (value: Value) => void;
	onBlur: () => void;
	error: string | undefined;
	touched: boolean;
	touchedFields: TouchedFields<object>;
	errors: FieldErrors<object>;
	values: { [key: string]: any };
	disabled: boolean;
	disabledFields: DisabledFields<object>;
}

export interface FieldProps<Value> {
	name: string;
	defaultValue?: any;
	children: (props: FieldChildProps<Value>) => ReactElement | null;
}

export const mapContextToFieldChildProps = <
	FieldValue,
	FormValues extends object
>(
	context: FormContextProviderValue<FormValues>,
	options: {
		name: string;
		defaultValue?: FieldValue;
	}
): FieldChildProps<FieldValue> => {
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
	const childProps: FieldChildProps<FieldValue> = {
		value: value === undefined ? defaultValue : value,
		setFieldValue: (newValue: FieldValue) => setFieldValue(name, newValue),
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
					mapContextToFieldChildProps<Value, object>(props, {
						name,
						defaultValue
					})
				);
			}}
		</FormContext.Consumer>
	);
};
