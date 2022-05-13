import { useActions } from './useActions';

export const useNewPage = (): (() => void) => {
	const { createPage, resetCells, resetTabs, resetBundles } = useActions();
	return () => {
		createPage();
		resetCells();
		resetTabs();
		resetBundles();
	};
};
