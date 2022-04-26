import produce from 'immer';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';

export type CodeBundle = {
	loading: boolean;
	error: string;
	warning: string;
	code: {
		[key in EditorLanguages]?: string;
	};
};

export type BundleState = {
	// Cell ID
	[key: string]: CodeBundle;
};

const initialState: BundleState = {};

const reducer = produce(
	(state: BundleState = initialState, action: BundleAction): BundleState => {
		switch (action.type) {
			case BundleActionType.BUNDLE_START: {
				const { cellId, language } = action.payload;
				if (!state[cellId]) state[cellId] = {} as CodeBundle;
				state[cellId].loading = true;
				state[cellId].error = '';
				state[cellId].warning = '';
				state[cellId].code = state[cellId].code || {};
				state[cellId].code[language] = '';

				return state;
			}
			case BundleActionType.BUNDLE_COMPLETE: {
				const { cellId, language, bundle } = action.payload;
				state[cellId].loading = false;
				state[cellId].error = bundle.error;
				state[cellId].warning = bundle.warning;
				state[cellId].code[language] = bundle.code;
				return state;
			}

			case BundleActionType.RESET_BUNDLES: {
				state = initialState;
				return state;
			}
			default:
				return state;
		}
	},
	initialState
);

export default reducer;
