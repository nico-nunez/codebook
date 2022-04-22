import { PageActionType } from '../action-types';
import { CellTypes } from '../cell';

export interface UpdatePageNameAction {
	type: PageActionType.UPDATE_PAGE_NAME;
	payload: {
		name: string;
	};
}

export type PageAction = UpdatePageNameAction;
