import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import { BundleAction, ResetBundlesAction } from '../actions';
import bundle from '../../bundler';
import { EditorLanguages } from '../../components/Code-Editor/code-editor';

export const createBundle = (
	cellId: string,
	language: EditorLanguages,
	input: string
) => {
	return async (dispatch: Dispatch<BundleAction>) => {
		dispatch({
			type: BundleActionType.BUNDLE_START,
			payload: {
				cellId,
				language,
			},
		});

		const result = await bundle(input, language);

		dispatch({
			type: BundleActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				language,
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
