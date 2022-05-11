import { PageActionType } from '../action-types';
import { SavedPage } from '../models';

export interface CreatePageAction {
	type: PageActionType.CREATE_PAGE;
	payload: {
		id?: number;
		page_name?: string;
		error?: string | null;
	};
}

export interface LoadPageAction {
	type: PageActionType.LOAD_PAGE;
	payload: SavedPage;
}

export interface UpdatePageNameAction {
	type: PageActionType.UPDATE_PAGE_NAME;
	payload: {
		page_name: string;
	};
}

export interface UpdateSavedChangesAction {
	type: PageActionType.UPDATE_SAVED_CHANGES;
	payload: { saved_changes: boolean };
}

export interface SavePageAction {
	type: PageActionType.SAVE_PAGE;
	payload: {};
}

export interface SetPageErrorAction {
	type: PageActionType.SET_PAGE_ERROR;
	payload: {
		error: string;
	};
}

export interface ClearPageErrorAction {
	type: PageActionType.CLEAR_PAGE_ERROR;
	payload: {};
}

// --- TODO ---
// export interface AddPageImport {
// 	type: PageActionType.ADD_PAGE_IMPORT;
// 	payload: {
// 		id: string;
// 	};
// }
// export interface RemovePageImport {
// 	type: PageActionType.REMOVE_PAGE_IMPORT;
// 	payload: {
// 		id: string;
// 	};
// }

export type PageAction =
	| CreatePageAction
	| LoadPageAction
	| UpdatePageNameAction
	| UpdateSavedChangesAction
	| SavePageAction
	| SetPageErrorAction
	| ClearPageErrorAction;
// | AddPageImport
// | RemovePageImport;
