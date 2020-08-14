import React, { FC, ReactElement } from "react";
import _ from "lodash";

import { FormContext } from ".";
import { mapContextToFieldChildProps } from "./utils";

export interface FieldChildProps<Value> {
	value: Value;
	setFieldValue: (value: Value) => void;
	onBlur: () => void;
	error: string | undefined;
	touched: boolean;
	touchedFields: { [key: string]: boolean };
	errors: { [key: string]: string };
	values: { [key: string]: any };
	disabled: boolean;
	disabledFields: { [key: string]: boolean };
}

export interface FieldProps<Value> {
	name: string;
	defaultValue?: any;
	children: (props: FieldChildProps<Value>) => ReactElement | null;
}

export const Field = <Value,>({
	children,
	name,
	defaultValue
}: FieldProps<Value>): ReactElement => {
	return (
		<FormContext.Consumer>
			{(props) => {
				return children(
					mapContextToFieldChildProps<Value>(props, {
						name,
						defaultValue
					})
				);
			}}
		</FormContext.Consumer>
	);
};
