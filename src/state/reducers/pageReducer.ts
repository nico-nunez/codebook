import produce from 'immer';
import { PageAction } from '../actions';
import { PageActionType } from '../action-types';
import { randomId } from '../helpers';

export interface PageState {
	id: number | null;
	loading: boolean;
	error: string | null;
	page_name: string;
	saved_changes: boolean;
}

const initialState: PageState = {
	id: null,
	loading: false,
	error: null,
	page_name: 'New Page',
	saved_changes: true,
};

const reducer = produce(
	(state: PageState = initialState, action: PageAction): PageState => {
		switch (action.type) {
			case PageActionType.CREATE_PAGE: {
				const {
					id = randomId(),
					page_name = 'New Page',
					error = null,
				} = action.payload;
				state = {
					id,
					page_name,
					error,
					loading: false,
					saved_changes: true,
				};
				return state;
			}
			case PageActionType.UPDATE_PAGE_NAME:
				state.page_name = action.payload.page_name;
				return state;

			case PageActionType.UPDATE_SAVED_CHANGES:
				state.saved_changes = action.payload.saved_changes;
				return state;

			// --- TODO ---
			// case PageActionType.ADD_PAGE_IMPORT:
			// 	state.imports.push(action.payload.id);
			// 	return state;

			// case PageActionType.REMOVE_PAGE_IMPORT:
			// 	state.imports = state.imports.filter(
			// 		(pageId) => pageId !== action.payload.id
			// 	);
			// 	return state;

			default:
				return state;
		}
	},
	initialState
);

export default reducer;
