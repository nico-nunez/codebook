import { Dispatch } from 'redux';
import {
	NewPageAction,
	UpdatePageNameAction,
	UpdateSavedChangesAction,
	// AddPageImport,
	// RemovePageImport,
} from '../actions/pageActions';
import {
	BundleActionType,
	CellActionType,
	PageActionType,
	TabActionType,
} from '../action-types';
import {
	ResetBundlesAction,
	ResetCellsAction,
	ResetTabsAction,
} from '../actions';

type GenerateNewPageAction =
	| NewPageAction
	| ResetCellsAction
	| ResetTabsAction
	| ResetBundlesAction;

export const newPage = () => {
	return (dispatch: Dispatch<GenerateNewPageAction>) => {
		dispatch({
			type: PageActionType.NEW_PAGE,
			payload: {},
		});
		dispatch({
			type: CellActionType.RESET_CELLS,
			payload: {},
		});
		dispatch({
			type: TabActionType.RESET_TABS,
			payload: {},
		});
		dispatch({
			type: BundleActionType.RESET_BUNDLES,
			payload: {},
		});
	};
};

export const updatePageName = (page_name: string): UpdatePageNameAction => {
	return {
		type: PageActionType.UPDATE_PAGE_NAME,
		payload: {
			page_name,
		},
	};
};

export const updateSavedChanges = (
	saved_changes: boolean
): UpdateSavedChangesAction => {
	return {
		type: PageActionType.UPDATE_SAVED_CHANGES,
		payload: { saved_changes },
	};
};

// TODO
// export const addPageImport = (id: string): AddPageImport => {
// 	return {
// 		type: PageActionType.ADD_PAGE_IMPORT,
// 		payload: {
// 			id,
// 		},
// 	};
// };

// export const removePageImport = (id: string): RemovePageImport => {
// 	return {
// 		type: PageActionType.REMOVE_PAGE_IMPORT,
// 		payload: {
// 			id,
// 		},
// 	};
// };
