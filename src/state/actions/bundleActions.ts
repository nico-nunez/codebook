import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { BundleActionType } from '../action-types';

export interface BundleStartAction {
	type: BundleActionType.BUNDLE_START;
	payload: {
		cellId: string;
		language: EditorLanguages;
	};
}

export interface BundleCompleteAction {
	type: BundleActionType.BUNDLE_COMPLETE;
	payload: {
		cellId: string;
		language: EditorLanguages;
		bundle: {
			code: string;
			error: string;
			warning: string;
		};
	};
}

export interface ResetBundlesAction {
	type: BundleActionType.RESET_BUNDLES;
	payload: {};
}

export type BundleAction =
	| BundleStartAction
	| BundleCompleteAction
	| ResetBundlesAction;
