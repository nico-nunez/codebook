import { store } from '../store';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { FullPage, SavedPage } from '../models';
import { NavigateFunction } from 'react-router-dom';
import { ResetBundlesAction } from '../actions/bundleActions';
import { DisplayModalAction, HideModalAction } from '../actions';
import { LoadCellAction, ResetCellsAction } from '../actions/cellsActions';
import { LoadTabAction, ResetTabsAction } from '../actions/tabsActions';
import {
	CreatePageAction,
	LoadPageAction,
	UpdatePageNameAction,
	UpdateSavedChangesAction,
	SetPageErrorAction,
	ClearPageErrorAction,
	// AddPageImport,
	// RemovePageImport,
} from '../actions/pageActions';
import {
	BundleActionType,
	CellActionType,
	ModalActionType,
	PageActionType,
	TabActionType,
} from '../action-types';

axios.defaults.withCredentials = true;

type GenerateNewPageAction =
	| CreatePageAction
	| ResetCellsAction
	| ResetTabsAction
	| ResetBundlesAction;

type LoadFullPageAction =
	| LoadPageAction
	| LoadCellAction
	| LoadTabAction
	| DisplayModalAction
	| HideModalAction
	| UpdateSavedChangesAction
	| ResetCellsAction
	| ResetTabsAction
	| SetPageErrorAction
	| ResetBundlesAction;

// New Page
export const newPage = () => {
	return (dispatch: Dispatch<GenerateNewPageAction>) => {
		dispatch({
			type: PageActionType.CREATE_PAGE,
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

// Save New Page
export const saveNewPage = (navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<LoadFullPageAction>) => {
		const state = store.getState();
		try {
			dispatch({
				type: ModalActionType.DISPLAY_MODAL,
				payload: {
					modalName: 'progressBar',
				},
			});
			const page_name = state.page.page_name;
			const cells = state.cells.order.map(
				(cell_id) => state.cells.data[cell_id]
			);
			const tabs = state.tabs.order.map((tabId) => state.tabs.data[tabId]);
			const { data }: AxiosResponse<SavedPage> = await axios.post(
				'/api/pages',
				{
					page_name,
					cells,
					tabs,
				}
			);
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
			navigate(`/pages/${data.id}`);
		} catch (err: any) {
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
			dispatch({
				type: PageActionType.SET_PAGE_ERROR,
				payload: {
					error: err.response.data.error.messages,
				},
			});
		}
	};
};

type SaveExistingPageAction = UpdateSavedChangesAction | SetPageErrorAction;

// SAVE EXISTING PAGE
export const saveExistingPage = () => {
	return async (dispatch: Dispatch<SaveExistingPageAction>) => {
		try {
			const state = store.getState();
			const { page_name } = state.page;
			const cells = state.cells.order.map((id) => {
				const { cell_type, content } = state.cells.data[id];
				return {
					id,
					cell_type,
					content,
				};
			});
			const tabs = state.tabs.order.map((id) => {
				const { code_language, content } = state.tabs.data[id];
				return { id, code_language, content };
			});
			await axios.put(`/api/pages/${state.page.id}`, {
				page_name,
				cells,
				tabs,
			});
			dispatch({
				type: PageActionType.UPDATE_SAVED_CHANGES,
				payload: {
					saved_changes: true,
				},
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: PageActionType.SET_PAGE_ERROR,
				payload: {
					error: err.response.data.error.messages,
				},
			});
		}
	};
};

// Fetch and load Page
export const fetchPage = (id: number | null, navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<LoadFullPageAction>) => {
		try {
			const { data }: AxiosResponse<FullPage> = await axios.get(
				`/api/pages/${id}`
			);
			loadFullPage(dispatch, data);
		} catch (err: any) {
			dispatch({
				type: PageActionType.SET_PAGE_ERROR,
				payload: {
					error: err.response.data.error.messages,
				},
			});
			navigate('/');
		}
	};
};

// UPDATE PAGE
export const updatePageName = (page_name: string): UpdatePageNameAction => {
	return {
		type: PageActionType.UPDATE_PAGE_NAME,
		payload: {
			page_name,
		},
	};
};

// UPDATE SAVED CHANGES
export const updateSavedChanges = (
	saved_changes: boolean
): UpdateSavedChangesAction => {
	return {
		type: PageActionType.UPDATE_SAVED_CHANGES,
		payload: { saved_changes },
	};
};

// SET ERROR
export const setPageError = (error: string): SetPageErrorAction => {
	return {
		type: PageActionType.SET_PAGE_ERROR,
		payload: {
			error,
		},
	};
};

// CLEAR ERROR
export const clearError = (): ClearPageErrorAction => {
	return {
		type: PageActionType.CLEAR_PAGE_ERROR,
		payload: {},
	};
};

const loadFullPage = (
	dispatch: Dispatch<LoadFullPageAction>,
	data: FullPage
) => {
	dispatch({
		type: BundleActionType.RESET_BUNDLES,
		payload: {},
	});
	dispatch({
		type: PageActionType.LOAD_PAGE,
		payload: { ...data.page },
	});
	dispatch({
		type: CellActionType.RESET_CELLS,
		payload: {},
	});
	for (const cell of data.cells) {
		dispatch({
			type: CellActionType.LOAD_CELL,
			payload: cell,
		});
	}
	dispatch({
		type: TabActionType.RESET_TABS,
		payload: {},
	});
	for (const tab of data.tabs) {
		dispatch({
			type: TabActionType.LOAD_TAB,
			payload: tab,
		});
	}
	dispatch({
		type: PageActionType.UPDATE_SAVED_CHANGES,
		payload: {
			saved_changes: true,
		},
	});
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

// TODO
// export const removePageImport = (id: string): RemovePageImport => {
// 	return {
// 		type: PageActionType.REMOVE_PAGE_IMPORT,
// 		payload: {
// 			id,
// 		},
// 	};
// };
