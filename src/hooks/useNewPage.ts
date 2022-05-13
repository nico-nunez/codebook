import { useActions } from './useActions';
import { useNavigate } from 'react-router-dom';
import { useCurrentPage } from './useCurrentPage';

export const useNewPage = (): (() => void) => {
	const { deletePage, createPage, resetCells, resetTabs, resetBundles } =
		useActions();
	const page = useCurrentPage();
	const navigate = useNavigate();
	return () => {
		if (!page.user_id) deletePage(page.id);
		createPage();
		resetCells();
		resetTabs();
		resetBundles();
		navigate('/');
	};
};
