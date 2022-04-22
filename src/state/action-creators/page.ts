import { PageActionType } from '../action-types';
import {
	UpdatePageNameAction,
	AddPageImport,
	RemovePageImport,
} from '../actions/pageActions';
import { CellTypes } from '../cell';

export const updatePageName = (name: string): UpdatePageNameAction => {
	return {
		type: PageActionType.UPDATE_PAGE_NAME,
		payload: {
			name,
		},
	};
};

export const addPageImport = (id: string): AddPageImport => {
	return {
		type: PageActionType.ADD_PAGE_IMPORT,
		payload: {
			id,
		},
	};
};

export const removePageImport = (id: string): RemovePageImport => {
	return {
		type: PageActionType.REMOVE_PAGE_IMPORT,
		payload: {
			id,
		},
	};
};
