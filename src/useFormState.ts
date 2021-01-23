import { useState, Dispatch, SetStateAction } from "react";
import { FieldErrors, TouchedFields } from "./FormProvider";
import { usePrevious, PreviousValue } from "./usePrevious";

export interface UseFormStateOptionsBase<Values extends object> {
	errors?: FieldErrors<Values>;
	touched?: TouchedFields<Values>;
	formErrors?: string[];
}
export interface UseFormStateOptions<Values extends object>
	extends UseFormStateOptionsBase<Values> {
	values: Values;
}

export interface UseNullableFormStateOptions<Values extends object>
	extends UseFormStateOptionsBase<Values> {
	values: Values | null;
}

export interface UseFormStateReturnBase<Values extends object> {
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

export interface UseFormStateReturn<Values extends object>
	extends UseFormStateReturnBase<Values> {
	values: Values;
	previousValues: PreviousValue<Values>;
}

export interface UseNullableFormStateReturn<Values extends object>
	extends UseFormStateReturnBase<Values> {
	values: Values | null;
	previousValues: PreviousValue<Values | null>;
}

export interface UseFormStateFunction {
	<Values extends object>(
		options: UseFormStateOptions<Values>
	): UseFormStateReturn<Values>;
	<Values extends object>(
		options: UseNullableFormStateOptions<Values>
	): UseNullableFormStateReturn<Values>;
}

export const useFormState: UseFormStateFunction = <Values extends object>({
	values: initialValues,
	errors: initialErrors = {},
	touched: initialTouched = {},
	formErrors: initialFormErrors = []
}: UseFormStateOptions<Values>) => {
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
