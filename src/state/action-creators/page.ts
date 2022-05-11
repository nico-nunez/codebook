import { store } from '../store';
import { Dispatch } from 'redux';
import { resetBundles } from './bundles';
import { loadTab, resetTabs } from './tabs';
import axios, { AxiosResponse } from 'axios';
import { loadCell, resetCells } from './cells';
import { FullPage, SavedPage } from '../models';
import { PageActionType } from '../action-types';
import { displayModal, hideModal } from './modal';
import { NavigateFunction } from 'react-router-dom';
import {
	DisplayModalAction,
	HideModalAction,
	ResetBundlesAction,
	LoadCellAction,
	ResetCellsAction,
	LoadTabAction,
	ResetTabsAction,
} from '../actions';
import {
	LoadPageAction,
	UpdatePageNameAction,
	UpdateSavedChangesAction,
	ResetPageAction,
	SetPageErrorAction,
	ClearPageErrorAction,
} from '../actions/pageActions';

axios.defaults.withCredentials = true;

type GenerateNewPageAction =
	| ResetPageAction
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
		dispatch(resetPage());
		dispatch(resetCells());
		dispatch(resetTabs());
		dispatch(resetBundles());
	};
};

// Save New Page
export const saveNewPage = (navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<LoadFullPageAction>) => {
		const state = store.getState();
		try {
			dispatch(displayModal('progressBar'));
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
			dispatch(hideModal());
			navigate(`/pages/${data.id}`);
		} catch (err: any) {
			dispatch(hideModal());
			dispatch(setPageError(err.response.data.error.messages));
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
			dispatch(updateSavedChanges(true));
		} catch (err: any) {
			dispatch(setPageError(err.response.data.error.messages));
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
			dispatch(setPageError(err.response.data.error.messages));
			navigate('/');
		}
	};
};

// LOAD PAGE
export const loadPage = (data: SavedPage): LoadPageAction => {
	return {
		type: PageActionType.LOAD_PAGE,
		payload: { ...data },
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

type DeleteSavedPageAction =
	| ResetPageAction
	| ResetBundlesAction
	| ResetCellsAction
	| ResetTabsAction
	| SetPageErrorAction;

// DELETE SAVED PAGE
export const deleteSavedPage = (id: number, navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<DeleteSavedPageAction>) => {
		try {
			await axios.delete(`/api/pages/${id}`);
			dispatch(resetPage());
			dispatch(resetCells());
			dispatch(resetTabs());
			dispatch(resetBundles());
			navigate('/');
		} catch (err: any) {
			dispatch(setPageError(err.response.data.error.messages));
		}
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

// RESET PAGE
export const resetPage = (): ResetPageAction => {
	return {
		type: PageActionType.RESET_PAGE,
		payload: {},
	};
};

const loadFullPage = (
	dispatch: Dispatch<LoadFullPageAction>,
	data: FullPage
) => {
	dispatch(resetCells());
	dispatch(resetTabs());
	dispatch(resetBundles());
	dispatch(loadPage(data.page));
	for (const cell of data.cells) {
		dispatch(loadCell(cell));
	}
	for (const tab of data.tabs) {
		dispatch(loadTab(tab));
	}
	dispatch(updateSavedChanges(true));
};
