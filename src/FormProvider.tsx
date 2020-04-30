import React, { Component, createContext } from "react";
import _ from "lodash";

export type FieldErrors<Values extends object> = Partial<
	Record<keyof Values, string>
>;

export type TouchedFields<Values> = Partial<Record<keyof Values, boolean>>;

export interface FormProviderProps<
	Values extends object,
	Context extends any = {}
> {
	validationSchema?: any | ((value: Values, context?: Context) => void);
	values: Values;
	errors?: FieldErrors<Values>;
	onChange: (value: Values, errors: FieldErrors<Values>, name?: string) => void;
	touched?: TouchedFields<Values>;
	onFieldTouch?: (fields: TouchedFields<Values>, name?: string) => void;
	castOnChange?: boolean;
	validateOnMount?: boolean;
	context?: Context;
	validateOnContextChange?: boolean;
}

interface FormContextProviderValue {
	values: object;
	setFieldValue: (name: string, value: any) => void;
	setTouchedField: (name: string) => void;
	errors: FieldErrors<object>;
	touched: TouchedFields<object>;
}

export const FormContext = createContext<FormContextProviderValue>({
	values: {},
	setFieldValue: () => {},
	setTouchedField: () => {},
	errors: {},
	touched: {}
});

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
		const newValues = _.set({ ...this.props.values }, name, value);
		const errors = this.validateForm(newValues);
		this.props.onChange(newValues, errors, name);
	};

	private setTouchedField = (name: string) => {
		this.props.onFieldTouch &&
			this.props.onFieldTouch({ ...this.props.touched, [name]: true }, name);
	};

	private validateForm = (values: Values) => {
		const { validationSchema, context } = this.props;
		let errorMessages: FieldErrors<Values> = {};
		if (validationSchema) {
			validationSchema(values, context);
		}
		return errorMessages;
	};

	render() {
		const { values, children } = this.props;
		return (
			<FormContext.Provider
				value={{
					values,
					setFieldValue: this.setFieldValue,
					setTouchedField: this.setTouchedField,
					errors: this.props.errors || {},
					touched: this.props.touched || {}
				}}
			>
				{children}
			</FormContext.Provider>
		);
	}
}
