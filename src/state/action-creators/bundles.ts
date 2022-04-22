import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';
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
				bundle: result,
			},
		});
	};
};
