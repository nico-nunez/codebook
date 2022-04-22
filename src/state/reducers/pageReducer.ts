import produce from 'immer';
import { PageAction } from '../actions';
import { PageActionType } from '../action-types';
import { Cell, CellTypes } from '../cell';

export interface PageState {
	loading: boolean;
	error: string | null;
	name: string;
}

const initialState: PageState = {
	loading: false,
	error: null,
	name: 'New Page',
};

const reducer = produce(
	(state: PageState = initialState, action: PageAction): PageState => {
		switch (action.type) {
			case PageActionType.UPDATE_PAGE_NAME:
				state.name = action.payload.name;
				return state;

			default:
				return state;
		}
	},
	initialState
);

export default reducer;
