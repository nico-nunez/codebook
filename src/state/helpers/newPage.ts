import { Dispatch } from 'redux';

import {
	BundleActionType,
	CellActionType,
	PageActionType,
	TabActionType,
} from '../action-types';
import {
	NewPageAction,
	ResetBundlesAction,
	ResetCellsAction,
	ResetTabsAction,
} from '../actions';

type GenerateNewPageAction =
	| NewPageAction
	| ResetCellsAction
	| ResetTabsAction
	| ResetBundlesAction;

export const generateNewPage = () => {
	return (dispatch: Dispatch<GenerateNewPageAction>) => {
		console.log('ran');
		dispatch({
			type: PageActionType.NEW_PAGE,
			payload: {},
		});
		dispatch({
			type: CellActionType.RESET_CELLS,
			payload: {},
		});
		dispatch({
			type: TabActionType.RESET_TABS,
			payload: {},
		});
		dispatch({
			type: BundleActionType.RESET_BUNDLES,
			payload: {},
		});
	};
};
