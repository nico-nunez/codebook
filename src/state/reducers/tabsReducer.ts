import produce from 'immer';
import { TabActionType } from '../action-types';
import { TabAction } from '../actions';
import { tabsAction, TabsState, initialTabsState } from '../helpers';

const reducer = produce(
	(state: TabsState = initialTabsState, action: TabAction): TabsState => {
		switch (action.type) {
			case TabActionType.CREATE_TAB:
				return tabsAction.createTab(state, action);

			case TabActionType.MOVE_TAB:
				return tabsAction.moveTab(state, action);

			case TabActionType.DELETE_TAB:
				return tabsAction.deleteTab(state, action);

			case TabActionType.UPDATE_TAB:
				return tabsAction.updateTab(state, action);
			default:
				return state;
		}
	},
	initialTabsState
);
export default reducer;
