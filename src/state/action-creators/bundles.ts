import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import { BundleAction, ResetBundlesAction } from '../actions';
import bundle from '../../bundler';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';

export const createBundle = (
	cell_id: number,
	code_language: EditorLanguages,
	input: string
) => {
	return async (dispatch: Dispatch<BundleAction>) => {
		dispatch({
			type: BundleActionType.BUNDLE_START,
			payload: {
				cell_id,
				code_language,
			},
		});

		const result = await bundle(input, code_language);

		dispatch({
			type: BundleActionType.BUNDLE_COMPLETE,
			payload: {
				cell_id,
				code_language,
				bundle: result,
			},
		});
	};
};

export const resetBundles = (): ResetBundlesAction => {
	return {
		type: BundleActionType.RESET_BUNDLES,
		payload: {},
	};
};
