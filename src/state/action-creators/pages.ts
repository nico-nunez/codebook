import { store } from '../store';
import { Dispatch } from 'redux';
import { resetBundles } from './bundles';
import { loadTab, resetTabs } from './tabs';
import axios, { AxiosResponse } from 'axios';
import { loadCell, resetCells } from './cells';
import { FullPage, SavedPage } from '../models';
import { PagesActionType } from '../action-types';
import { displayModal, hideModal } from './modal';
import { NavigateFunction } from 'react-router-dom';
import { ResetBundlesAction } from '../actions/bundleActions';
import { LoadTabAction, ResetTabsAction } from '../actions/tabsActions';
import { LoadCellAction, ResetCellsAction } from '../actions/cellsActions';
import { DisplayModalAction, HideModalAction } from '../actions/modalActions';
import {
	CreatePageAction,
	LoadSavedPageAction,
	LoadSavedPagesAction,
	UpdatePageNameAction,
	UpdateSavedStatusAction,
	DeletePageAction,
	SetCurrentPageAction,
	AddRecentPageAction,
	RemoveRecentPageAction,
	SetErrorAction,
	ClearErrorAction,
} from '../actions/pagesActions';

axios.defaults.withCredentials = true;

export const createPage = (): CreatePageAction => {
	return {
		type: PagesActionType.CREATE_PAGE,
		payload: {},
	};
};

export const setCurrentPage = (id: number): SetCurrentPageAction => {
	return {
		type: PagesActionType.SET_CURRENT_PAGE,
		payload: {
			id,
		},
	};
};

// // GENERATE NEW PAGE
// type GenerateNewPageAction =
// 	| CreatePageAction
// 	| ResetCellsAction
// 	| ResetTabsAction
// 	| ResetBundlesAction;

// export const newPage = () => {
// 	return (dispatch: Dispatch<GenerateNewPageAction>) => {
// 		dispatch(createPage());
// 		dispatch(resetCells());
// 		dispatch(resetTabs());
// 		dispatch(resetBundles());
// 	};
// };

// SAVE NEW PAGE
type LoadFullPageAction =
	| LoadSavedPageAction
	| LoadCellAction
	| LoadTabAction
	| DisplayModalAction
	| HideModalAction
	| UpdateSavedStatusAction
	| ResetCellsAction
	| ResetTabsAction
	| SetErrorAction
	| ResetBundlesAction;

export const saveNewPage = (navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<LoadFullPageAction>) => {
		const state = store.getState();
		try {
			dispatch(displayModal('progressBar'));
			const { page_name } = state.pages.data[state.pages.current.id];
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
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// SAVE EXISTING PAGE
type SaveExistingPageAction = UpdateSavedStatusAction | SetErrorAction;

export const saveExistingPage = () => {
	return async (dispatch: Dispatch<SaveExistingPageAction>) => {
		try {
			const state = store.getState();
			const { page_name } = state.pages.data[state.pages.current.id];
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
			await axios.put(`/api/pages/${state.pages.current.id}`, {
				page_name,
				cells,
				tabs,
			});
			dispatch(updateSavedChanges(true));
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// LOAD FULL PAGE (CELLS & TABS)
export const fetchFullPage = (
	id: number | null,
	navigate: NavigateFunction
) => {
	return async (dispatch: Dispatch<LoadFullPageAction>) => {
		try {
			const { data }: AxiosResponse<FullPage> = await axios.get(
				`/api/pages/${id}`
			);
			loadFullPage(dispatch, data);
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
			navigate('/');
		}
	};
};

// LOAD SAVED PAGE (PAGE ONLY)
export const loadSavedPage = (page: SavedPage): LoadSavedPageAction => {
	return {
		type: PagesActionType.LOAD_SAVED_PAGE,
		payload: { page },
	};
};

// FETCH AND LOAD PAGES (PAGES ONLY)
export const fetchPages = (page?: number, limit?: number) => {
	return async (dispatch: Dispatch<LoadSavedPagesAction | SetErrorAction>) => {
		try {
			const { data }: AxiosResponse<SavedPage[]> = await axios.get(
				'/api/pages',
				{
					params: {
						page,
						limit,
					},
				}
			);
			dispatch(loadSavedPages(data));
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// LOAD SAVED PAGE (SINGLE)
export const loadSavedPages = (pages: SavedPage[]): LoadSavedPagesAction => {
	return {
		type: PagesActionType.LOAD_SAVED_PAGES,
		payload: {
			pages,
		},
	};
};

// LOAD SAVED PAGES (MANY)
export const loadUserPages = (
	userId: number,
	limit?: number,
	page?: number
) => {
	return async (dispatch: Dispatch<LoadSavedPagesAction | SetErrorAction>) => {
		try {
			const { data }: AxiosResponse<SavedPage[]> = await axios.get(
				`/api/users/${userId}/pages`,
				{
					params: {
						page,
						limit,
					},
				}
			);
			dispatch(loadSavedPages(data));
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

// UPDATE PAGE NAME
export const updatePageName = (page_name: string): UpdatePageNameAction => {
	return {
		type: PagesActionType.UPDATE_PAGE_NAME,
		payload: {
			page_name,
		},
	};
};

// UPDATE SAVED CHANGES
export const updateSavedChanges = (saved: boolean): UpdateSavedStatusAction => {
	return {
		type: PagesActionType.UPDATE_SAVED_STATUS,
		payload: {
			saved,
		},
	};
};

// DELETE CURRENT PAGE
export const deletePage = (id: number): DeletePageAction => {
	return {
		type: PagesActionType.DELETE_PAGE,
		payload: {
			id,
		},
	};
};

// DELETE SAVED PAGE
type DeleteSavedPageAction =
	| DeletePageAction
	| CreatePageAction
	| ResetBundlesAction
	| ResetCellsAction
	| ResetTabsAction
	| SetErrorAction;

// DELETE CURRENT PAGE
export const deleteSavedPage = (id: number, navigate: NavigateFunction) => {
	return async (dispatch: Dispatch<DeleteSavedPageAction>) => {
		try {
			await axios.delete(`/api/pages/${id}`);
			dispatch(deletePage(id));
			dispatch(createPage());
			dispatch(resetCells());
			dispatch(resetTabs());
			dispatch(resetBundles());
			navigate('/');
		} catch (err: any) {
			dispatch(setError(err.response.data.error.messages));
		}
	};
};

export const addRecent = (id: number): AddRecentPageAction => {
	return {
		type: PagesActionType.ADD_RECENT_PAGE,
		payload: { id },
	};
};

export const removeRecent = (id: number): RemoveRecentPageAction => {
	return {
		type: PagesActionType.REMOVE_RECENT_PAGE,
		payload: { id },
	};
};

// SET ERROR
export const setError = (error: string): SetErrorAction => {
	return {
		type: PagesActionType.SET_ERROR,
		payload: {
			error,
		},
	};
};

// CLEAR ERROR
export const clearError = (): ClearErrorAction => {
	return {
		type: PagesActionType.CLEAR_ERROR,
		payload: {},
	};
};

// LOAD FULL PAGE HELPER
const loadFullPage = (
	dispatch: Dispatch<LoadFullPageAction>,
	data: FullPage
) => {
	dispatch(resetCells());
	dispatch(resetTabs());
	dispatch(resetBundles());
	dispatch(loadSavedPage(data.page));
	for (const cell of data.cells) {
		dispatch(loadCell(cell));
	}
	for (const tab of data.tabs) {
		dispatch(loadTab(tab));
	}
	dispatch(updateSavedChanges(true));
};
