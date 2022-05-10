import produce from 'immer';
import { TabAction } from '../actions';
import { TabActionType } from '../action-types';
import { tabsAction, TabsState, initialTabsState } from '../helpers';

const reducer = produce(
	(state: TabsState = initialTabsState, action: TabAction): TabsState => {
		switch (action.type) {
			case TabActionType.CREATE_TAB:
				return tabsAction.createTab(state, action);

			case TabActionType.LOAD_TAB:
				return tabsAction.loadTab(state, action);

			case TabActionType.MOVE_TAB:
				return tabsAction.moveTab(state, action);

			case TabActionType.UPDATE_TAB:
				return tabsAction.updateTab(state, action);

			case TabActionType.UPDATE_ACTIVE_TAB:
				return tabsAction.updateActiveTab(state, action);

			case TabActionType.DELETE_TAB:
				return tabsAction.deleteTab(state, action);

			case TabActionType.RESET_TABS:
				state = initialTabsState;
				return state;

			default:
				return state;
		}
	},
	initialTabsState
);
export default reducer;
