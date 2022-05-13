import { SavedPage } from '../models';
import { PagesActionType } from '../action-types';

export interface CreatePageAction {
	type: PagesActionType.CREATE_PAGE;
	payload: {};
}

export interface SetCurrentPageAction {
	type: PagesActionType.SET_CURRENT_PAGE;
	payload: { id: number };
}

export interface LoadSavedPageAction {
	type: PagesActionType.LOAD_SAVED_PAGE;
	payload: {
		page: SavedPage;
	};
}

export interface LoadSavedPagesAction {
	type: PagesActionType.LOAD_SAVED_PAGES;
	payload: {
		pages: SavedPage[];
	};
}

export interface UpdatePageNameAction {
	type: PagesActionType.UPDATE_PAGE_NAME;
	payload: {
		page_name: string;
	};
}

export interface UpdateSavedStatusAction {
	type: PagesActionType.UPDATE_SAVED_STATUS;
	payload: {
		saved: boolean;
	};
}

export interface DeletePageAction {
	type: PagesActionType.DELETE_PAGE;
	payload: {
		id: number;
	};
}

export interface AddRecentPageAction {
	type: PagesActionType.ADD_RECENT_PAGE;
	payload: { id: number };
}

export interface RemoveRecentPageAction {
	type: PagesActionType.REMOVE_RECENT_PAGE;
	payload: { id: number };
}

export interface SetErrorAction {
	type: PagesActionType.SET_ERROR;
	payload: {
		error: string;
	};
}

export interface ClearErrorAction {
	type: PagesActionType.CLEAR_ERROR;
	payload: {};
}

export type PagesAction =
	| CreatePageAction
	| SetCurrentPageAction
	| LoadSavedPageAction
	| LoadSavedPagesAction
	| UpdatePageNameAction
	| UpdateSavedStatusAction
	| DeletePageAction
	| AddRecentPageAction
	| RemoveRecentPageAction
	| SetErrorAction
	| ClearErrorAction;
