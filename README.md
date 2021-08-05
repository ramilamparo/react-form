# React-Form

react-form is a state management library that gives you complete control of your input states with simple and customizable input validation and state management.

## Installation

Installing the latest version with npm:

`npm install https://github.com/ramilamparo/react-form.git`

Installing a specific version with npm:

`npm install https://github.com/ramilamparo/react-form.git#v0.3.3`

## Usage

### Basic usage

```typescript
import { Field, FormProvider, useFormState } from "react-form";

const Input = ({ name, label, ...inputProps }: InputProps) => {
	return (
		<Field<string> defaultValue="" name={name}>
			{({ value, setFieldValue }) => (
				<>
					<label htmlFor={name}>{label}</StyledLabel>
					<input
						{...inputProps}
						id={name}
						value={value}
						onChange={(e) => setFieldValue(e.target.value)}
					/>
				</>
			)}
		</Field>
	);
};

interface FormValues {
    username: string;
    password: string;
};

const Form = () => {
    const form = useFormState<FormValues>({
        values: { // Initial values
            username: "",
            password: ""
        }
    });

    return (
        <FormProvider onChange={form.setValues} values={form.values}>
            <Input name="username" label="Username" />
            <Input name="email" label="Email" />
        </FormProvider>
    );
};

```

### With validation

```typescript
const Input = ({ name, label, ...inputProps }: InputProps) => {
	return (
		<Field<string> defaultValue="" name={name}>
			{({ value, error, setFieldValue, touched }) => (
				<>
					<label htmlFor={name}>{error ? error : label}</StyledLabel>
					<input
						{...inputProps}
						id={name}
						value={value}
						onChange={(e) => setFieldValue(e.target.value)}
					/>
				</>
			)}
		</Field>
	);
};

const Form = () => {
	const form = useFormState<FormValues>({
		values: {
			// Initial values
			username: "",
			password: ""
		},
		errors: { /** Optional initial error messages. */
			username: "Username is required."
		}
	});

	return (
		<FormProvider
			onChange={(values, errors) => {
				form.setValues(values);
				form.setErrors(errors);
			}}
			values={form.values}
			errors={form.errors}
			validation={(values) => {
				const errors: FieldErrors<FormValues> = {};
				if (values.username.length < 5) {
					errors.username === "Username is too short.";
				}
				return errors;
			}}
		>
			<Input name="username" label="Username" />
			<Input name="email" label="Email" />
		</FormProvider>
	);
};
```

## FormProvider Props

- `validation?: (value: Values, context?: Context) => FieldErrors<Values>` A function that returns an object with error messages.
- `values: Values` An object that contains the values of the fields.
- `errors?: FieldErrors<Values>` An object that contains the errors of the fields.
- `onChange: (value: Values, errors: FieldErrors<Values>, name?: string) => void` onChange callback that contains the new values and errors of the fields.
- `touched?: TouchedFields<Values>`
- `onFieldTouch?: (fields: TouchedFields<Values>, name?: string) => void` Callback that contains the fields that has been touched.
- `validateOnMount?: boolean` If set to true, it will run `validate` prop on mount.
- `context?: Context` Will be passed to `validate` prop as a second parameter.
- `disabledFields?: DisabledFields<Values>` An object that contains the disabled fields.

## Field Props

- `name: string` The name of the field where its value will be stored in the object as the key.
- `defaultValue?: any` The value to be used when the field has an undefined value.
- `children?:(props: FieldChildProps) => ReactElement` A function that should return an input element. The function is called with `FieldChildProps` that contains the field state values and errors, and helpers to set them.

### FieldChildProps

- `value: Value` Contains the value of the field according to the name of passed to the field.
- `setFieldValue: (value: Value) => void` A callback to change the value of the field.
- `onBlur: () => void` A callback to set when a field has been touched.
- `error: string | undefined` Contains an error message based on the name of the field.
- `touched: boolean` Whether the field has been touched or not.
- `touchedFields: TouchedFields<object>` Contains all the fields that has been touched or not.
- `errors: FieldErrors<object>` Contains all the errors of the form.
- `values: { [key: string]: any }` Contains all the values of the form.
- `disabled: boolean` Contains whether the field is disabled or not.
- `disabledFields: DisabledFields<object>` Contains all the disabled fields.
