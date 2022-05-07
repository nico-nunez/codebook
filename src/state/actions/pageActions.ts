import { PageActionType } from '../action-types';

export interface NewPageAction {
	type: PageActionType.NEW_PAGE;
	payload: {};
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
	| NewPageAction
	| UpdatePageNameAction
	| UpdateSavedChangesAction;
// | AddPageImport
// | RemovePageImport;
