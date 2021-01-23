# React-Form

React-Form is a controlled form state management.

## Installation

Installing the latest version with npm:

`npm install https://github.com/ramilamparo/react-form.git`

Installing a specific version with npm:

`npm install https://github.com/ramilamparo/react-form.git#v0.3.3`

## Usage

### Basic usage

```typescript
import { Field, FormProvider, useFormState } from "react-form";

const Input = ({ id, label, ...inputProps }: InputProps) => {
	return (
		<Field<string> defaultValue="" name={id}>
			{({ value, setFieldValue }) => (
				<>
					<label htmlFor={id}>{label}</StyledLabel>
					<input
						{...inputProps}
						id={id}
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
const Form = () => {
	const form = useFormState<FormValues>({
		values: {
			// Initial values
			username: "",
			password: ""
		}
	});

	return (
		<FormProvider
			onChange={form.setValues}
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
