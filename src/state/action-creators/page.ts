import { store } from '../store';
import { Dispatch } from 'redux';
import { FullPage } from '../models';
import axios, { AxiosResponse } from 'axios';
import { ResetBundlesAction } from '../actions/bundleActions';
import { LoadCellAction, ResetCellsAction } from '../actions/cellsActions';
import { LoadTabAction, ResetTabsAction } from '../actions/tabsActions';
import {
	CreatePageAction,
	UpdatePageNameAction,
	UpdateSavedChangesAction,
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
import { DisplayModalAction, HideModalAction } from '../actions';

axios.defaults.withCredentials = true;

type GenerateNewPageDispatch =
	| CreatePageAction
	| ResetCellsAction
	| ResetTabsAction
	| ResetBundlesAction;

type LoadPageDispatch =
	| CreatePageAction
	| LoadCellAction
	| LoadTabAction
	| DisplayModalAction
	| HideModalAction
	| UpdateSavedChangesAction
	| ResetCellsAction
	| ResetTabsAction
	| ResetBundlesAction;

// New Page
export const newPage = () => {
	return (dispatch: Dispatch<GenerateNewPageDispatch>) => {
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

// Save & Load New Page
export const saveNewPage = () => {
	return async (dispatch: Dispatch<LoadPageDispatch>) => {
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
			const { data }: AxiosResponse<FullPage> = await axios.post('/api/pages', {
				page_name,
				cells,
				tabs,
			});
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
			loadPage(dispatch, data);
		} catch (err: any) {
			console.log(err.response);
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
			dispatch({
				type: PageActionType.CREATE_PAGE,
				payload: {
					error: err.response.data.error.messages,
				},
			});
		}
	};
};

// Fetch and load Page
export const fetchPage = (id: number | null) => {
	return async (dispatch: Dispatch<LoadPageDispatch>) => {
		try {
			const { data }: AxiosResponse<FullPage> = await axios.get(
				`/api/pages/${id}`
			);
			loadPage(dispatch, data);
		} catch (err: any) {
			dispatch({
				type: PageActionType.CREATE_PAGE,
				payload: {
					error: err.response.data.error.messages,
				},
			});
		}
	};
};

// Update Page
export const updatePageName = (page_name: string): UpdatePageNameAction => {
	return {
		type: PageActionType.UPDATE_PAGE_NAME,
		payload: {
			page_name,
		},
	};
};

// Update Saved State
export const updateSavedChanges = (
	saved_changes: boolean
): UpdateSavedChangesAction => {
	return {
		type: PageActionType.UPDATE_SAVED_CHANGES,
		payload: { saved_changes },
	};
};

const loadPage = (dispatch: Dispatch<LoadPageDispatch>, data: FullPage) => {
	dispatch({
		type: BundleActionType.RESET_BUNDLES,
		payload: {},
	});
	dispatch({
		type: PageActionType.CREATE_PAGE,
		payload: {
			id: data.page.id,
			page_name: data.page.page_name,
		},
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
