import produce from 'immer';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';

interface BundleState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				error: string;
		  }
		| undefined;
}

const initialState: BundleState = {};

const reducer = produce(
	(state: BundleState = initialState, action: BundleAction): BundleState => {
		switch (action.type) {
			case BundleActionType.BUNDLE_START:
				state[action.payload.cellId] = {
					loading: true,
					code: '',
					error: '',
				};
				return state;
			case BundleActionType.BUNDLE_COMPLETE:
				state[action.payload.cellId] = {
					loading: false,
					code: action.payload.bundle.code,
					error: action.payload.bundle.error,
				};
				return state;
			default:
				return state;
		}
	},
	initialState
);

export default reducer;
