import { useRef, useEffect } from "react";

export type PreviousValue<T> = T | undefined;

export const usePrevious = <T>(value: T) => {
	const ref = useRef<PreviousValue<T>>();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
