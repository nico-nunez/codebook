import { PageActionType } from '../action-types';
import { CellTypes } from '../cell';

export interface UpdatePageNameAction {
	type: PageActionType.UPDATE_PAGE_NAME;
	payload: {
		name: string;
	};
}

export interface AddPageImport {
	type: PageActionType.ADD_PAGE_IMPORT;
	payload: {
		id: string;
	};
}
export interface RemovePageImport {
	type: PageActionType.REMOVE_PAGE_IMPORT;
	payload: {
		id: string;
	};
}

export type PageAction =
	| UpdatePageNameAction
	| AddPageImport
	| RemovePageImport;
