import React, { Component, createContext, Context } from "react";
import set from "lodash.set";

export type FieldErrors<Values extends object> = Partial<
	Record<keyof Values, string>
>;

export type TouchedFields<Values> = Partial<Record<keyof Values, boolean>>;

export type DisabledFields<Values> = Partial<Record<keyof Values, boolean>>;

export interface FormProviderProps<
	Values extends object,
	Context extends any = {}
> {
	validation?: (value: Values, context?: Context) => FieldErrors<Values>;
	values: Values;
	errors?: FieldErrors<Values>;
	onChange: (value: Values, errors: FieldErrors<Values>, name?: string) => void;
	touched?: TouchedFields<Values>;
	onFieldTouch?: (fields: TouchedFields<Values>, name?: string) => void;
	validateOnMount?: boolean;
	context?: Context;
	disabledFields?: DisabledFields<Values>;
}

export interface FormContextProviderValue<Values extends object> {
	values: Values;
	setFieldValue: <Value>(name: string, value: Value) => void;
	setTouchedField: (name: string) => void;
	errors: FieldErrors<Values>;
	touched: TouchedFields<Values>;
	disabled: DisabledFields<Values>;
}

export const FormContext = createContext<FormContextProviderValue<object>>({
	values: {},
	setFieldValue: () => {},
	setTouchedField: () => {},
	errors: {},
	touched: {},
	disabled: {}
});

export const getFormContext = <Values extends object>() =>
	(FormContext as unknown) as Context<FormContextProviderValue<Values>>;

export class FormProvider<Values extends object> extends Component<
	FormProviderProps<Values>
> {
	public componentDidMount() {
		const { validateOnMount, values, onChange } = this.props;
		if (validateOnMount) {
			const errors = this.validateForm(values);
			onChange(values, errors);
		}
	}

	private setFieldValue = (name: string, value: any) => {
		const { values, onChange } = this.props;
		const newValues = set({ ...values }, name, value);
		const errors = this.validateForm(newValues);
		onChange(newValues, errors, name);
	};

	private setTouchedField = (name: string) => {
		const { onFieldTouch, touched } = this.props;
		onFieldTouch && onFieldTouch({ ...touched, [name]: true }, name);
	};

	private validateForm = (values: Values) => {
		const { validation, context } = this.props;
		let errorMessages: FieldErrors<Values> = {};
		if (validation) {
			errorMessages = validation(values, context);
		}
		return errorMessages;
	};

	render() {
		const { values, children, errors, touched, disabledFields } = this.props;
		return (
			<FormContext.Provider
				value={{
					values,
					setFieldValue: this.setFieldValue,
					setTouchedField: this.setTouchedField,
					errors: errors || {},
					touched: touched || {},
					disabled: disabledFields || {}
				}}
			>
				{children}
			</FormContext.Provider>
		);
	}
}
