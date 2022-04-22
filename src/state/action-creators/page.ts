import { PageActionType } from '../action-types';
import { UpdatePageNameAction } from '../actions/pageActions';

export const updatePageName = (name: string): UpdatePageNameAction => {
	return {
		type: PageActionType.UPDATE_PAGE_NAME,
		payload: {
			name,
		},
	};
};
