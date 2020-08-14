import _ from "lodash";
import { FormContextProviderValue } from "./FormProvider";
import { FieldChildProps } from ".";

export const mapContextToFieldChildProps = <Value>(
	context: FormContextProviderValue,
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
	return childProps;
};
