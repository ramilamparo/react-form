import { useState, Dispatch, SetStateAction } from "react";
import { FieldErrors, TouchedFields } from "./FormProvider";
import { usePrevious, PreviousValue } from "./usePrevious";

export interface UseFormDataOptionsBase<Values extends object> {
	errors?: FieldErrors<Values>;
	touched?: TouchedFields<Values>;
	formErrors?: string[];
}
export interface UseFormDataOptions<Values extends object>
	extends UseFormDataOptionsBase<Values> {
	values: Values;
}

export interface UseNullableFormDataOptions<Values extends object>
	extends UseFormDataOptionsBase<Values> {
	values: Values | null;
}

export interface UseFormDataReturnBase<Values extends object> {
	setValues: Dispatch<SetStateAction<Values>>;
	errors: FieldErrors<Values>;
	setErrors: Dispatch<SetStateAction<FieldErrors<Values>>>;
	touched: TouchedFields<Values>;
	setTouched: Dispatch<SetStateAction<TouchedFields<Values>>>;
	formErrors: string[];
	setFormErrors: Dispatch<SetStateAction<string[]>>;
	hasErrors: boolean;
	previousErrors: PreviousValue<FieldErrors<Values>>;
	previousTouched: PreviousValue<TouchedFields<Values>>;
	previousFormErrors: PreviousValue<string[]>;
}

export interface UseFormDataReturn<Values extends object>
	extends UseFormDataReturnBase<Values> {
	values: Values;
	previousValues: PreviousValue<Values>;
}

export interface UseNullableFormDataReturn<Values extends object>
	extends UseFormDataReturnBase<Values> {
	values: Values | null;
	previousValues: PreviousValue<Values | null>;
}

export interface UseFormDataFunction {
	<Values extends object>(
		options: UseFormDataOptions<Values>
	): UseFormDataReturn<Values>;
	<Values extends object>(
		options: UseNullableFormDataOptions<Values>
	): UseNullableFormDataReturn<Values>;
}

export const useFormData: UseFormDataFunction = <Values extends object>({
	values: initialValues,
	errors: initialErrors = {},
	touched: initialTouched = {},
	formErrors: initialFormErrors = []
}: UseFormDataOptions<Values>) => {
	const [values, setValues] = useState(initialValues);
	const previousValues = usePrevious(values);
	const [errors, setErrors] = useState(initialErrors);
	const previousErrors = usePrevious(errors);
	const [touched, setTouched] = useState(initialTouched);
	const previousTouched = usePrevious(touched);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const previousFormErrors = usePrevious(formErrors);
	const hasErrors = Object.keys(errors).length > 0;

	return {
		values,
		setValues,
		errors,
		setErrors,
		touched,
		setTouched,
		formErrors,
		setFormErrors,
		hasErrors,
		previousValues,
		previousErrors,
		previousTouched,
		previousFormErrors
	};
};
