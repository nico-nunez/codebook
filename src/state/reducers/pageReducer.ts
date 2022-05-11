import produce from 'immer';
import { randomId } from '../helpers';
import { PageAction } from '../actions';
import { PageActionType } from '../action-types';

export interface PageState {
	id: number | null;
	loading: boolean;
	error: string | null;
	page_name: string;
	saved_changes: boolean;
	user_id?: number;
	created_at?: Date;
	updatae_at?: Date;
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

			case PageActionType.LOAD_PAGE:
				state = {
					...action.payload,
					loading: false,
					error: null,
					saved_changes: true,
				};
				return state;

			case PageActionType.UPDATE_PAGE_NAME:
				state.page_name = action.payload.page_name;
				return state;

			case PageActionType.UPDATE_SAVED_CHANGES:
				state.saved_changes = action.payload.saved_changes;
				return state;

			case PageActionType.SET_PAGE_ERROR:
				state.error = action.payload.error;
				return state;

			case PageActionType.CLEAR_PAGE_ERROR:
				state.error = null;
				return state;

			case PageActionType.RESET_PAGE:
				state = initialState;
				return state;

			default:
				return state;
		}
	},
	initialState
);

export default reducer;
