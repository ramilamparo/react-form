import { ReactElement, useContext, useMemo, useCallback } from "react";
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

export const useContextToFieldChildProps = <
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

	const value = useMemo(() => {
		return get(values, name);
	}, [values, name]);

	const error = useMemo(() => {
		return get(errors, name);
	}, [errors, name]);

	const touched = useMemo(() => {
		return get(touchedFields, name) || false;
	}, [touchedFields, name]);

	const disabled = useMemo(() => {
		return get(disabledFields, name) || false;
	}, [disabledFields, name]);

	const onBlur = useCallback(() => {
		setTouchedField(name);
	}, [setTouchedField, name]);

	const setFieldValueChildProp = useCallback(
		(newValue: FieldValue) => setFieldValue(name, newValue),
		[setFieldValue, name]
	);

	const childProps: FieldChildProps<FieldValue> = useMemo(() => {
		return {
			value: value === undefined ? defaultValue : value,
			setFieldValue: setFieldValueChildProp,
			onBlur,
			error,
			values,
			errors,
			touched,
			touchedFields,
			disabled,
			disabledFields
		};
	}, [
		defaultValue,
		disabled,
		onBlur,
		error,
		values,
		errors,
		touched,
		disabledFields,
		touchedFields,
		setFieldValueChildProp,
		value
	]);

	return childProps;
};

export const Field = <Value,>({
	children,
	name,
	defaultValue
}: FieldProps<Value>): ReactElement | null => {
	const context = useContext<FormContextProviderValue<object>>(FormContext);
	const childProps = useContextToFieldChildProps<Value, object>(context, {
		name,
		defaultValue
	});

	return children(childProps);
};
