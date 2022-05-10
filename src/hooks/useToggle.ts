import { useState, useCallback } from 'react';

type Toggler = [state: boolean, toggle: () => void];

export const useToggle = (initialState = false): Toggler => {
	const [state, setState] = useState(initialState);
	const toggle = useCallback(() => setState((state) => !state), []);
	return [state, toggle];
};
