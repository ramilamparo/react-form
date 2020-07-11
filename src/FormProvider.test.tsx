import React from "react";
import { shallow } from "enzyme";
import { FormProvider } from "./FormProvider";
import { Field } from "./Field";

describe("FormProvider", () => {
	it("Provides values to fields.", () => {
		let values = {
			username: ""
		};
		const form = shallow(
			<FormProvider
				values={values}
				onChange={(newValues) => {
					console.log(newValues);
					values = newValues;
				}}
			>
				<Field<string> name="username">
					{({ value, setFieldValue }) => {
						return (
							<input
								onChange={(e) => setFieldValue(e.target.value)}
								value={value}
							/>
						);
					}}
				</Field>
			</FormProvider>
		);
		const newUser = "mark";
		form
			.dive()
			.dive()
			.dive()
			.simulate("change", { target: { value: newUser } });
		expect(values.username).toEqual(newUser);
	});
});
