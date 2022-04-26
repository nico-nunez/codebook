import produce from 'immer';
import { PageAction } from '../actions';
import { PageActionType } from '../action-types';

export interface PageState {
	loading: boolean;
	error: string | null;
	name: string;
	imports: string[];
}

const initialState: PageState = {
	loading: false,
	error: null,
	name: 'New Page',
	imports: [],
};

const reducer = produce(
	(state: PageState = initialState, action: PageAction): PageState => {
		switch (action.type) {
			case PageActionType.NEW_PAGE: {
				state = initialState;
				return state;
			}
			case PageActionType.UPDATE_PAGE_NAME:
				state.name = action.payload.name;
				return state;

			case PageActionType.ADD_PAGE_IMPORT:
				state.imports.push(action.payload.id);
				return state;

			case PageActionType.REMOVE_PAGE_IMPORT:
				state.imports = state.imports.filter(
					(pageId) => pageId !== action.payload.id
				);
				return state;

			default:
				return state;
		}
	},
	initialState
);

export default reducer;
