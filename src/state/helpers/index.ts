export * from './cellsReducerHelpers';
export * from './tabsReducerHelpers';
export * from './newPage';

export const randomId = () => {
	return Math.random().toString(36).substring(2, 9);
};
