import { SavedTab, Tab } from '../models';
import { randomId } from '../helpers';
import {
	CreateTabAction,
	LoadTabAction,
	UpdateTabAction,
	MoveTabAction,
	UpdateActiveTabAction,
	DeleteTabAction,
} from '../actions';

export interface TabsState {
	order: number[];
	active: {
		[key: number]: number | null; // -> cell_id: tab_id
	};
	data: {
		[key: number]: Tab;
	};
}

export const initialTabsState: TabsState = {
	order: [],
	active: {},
	data: {},
};

const createTab = (state: TabsState, action: CreateTabAction) => {
	const { cell_id, code_language } = action.payload;
	const newTab: Tab = {
		id: randomId(),
		code_language,
		content: '',
		cell_id,
	};
	state.order.push(newTab.id);
	state.data[newTab.id] = newTab;
	return state;
};

const loadTab = (state: TabsState, action: LoadTabAction) => {
	const tab: SavedTab = { ...action.payload };
	state.order.push(tab.id);
	state.data[tab.id] = tab;
	return state;
};

const moveTab = (state: TabsState, action: MoveTabAction) => {
	const { id, direction } = action.payload;
	const index = state.order.indexOf(id);
	const targetIndex = direction === 'left' ? index - 1 : index + 1;
	if (targetIndex < 0 || targetIndex >= state.order.length) {
		return state;
	}
	state.order[index] = state.order[targetIndex];
	state.order[targetIndex] = id;
	return state;
};

const updateTab = (state: TabsState, action: UpdateTabAction) => {
	const { id, content } = action.payload;
	state.data[id].content = content;
	return state;
};

const updateActiveTab = (state: TabsState, action: UpdateActiveTabAction) => {
	const { cell_id, tab_id } = action.payload;
	state.active[cell_id] = tab_id || state.order[0];
	return state;
};

const deleteTab = (state: TabsState, action: DeleteTabAction) => {
	const { id } = action.payload;
	state.order = state.order.filter((tab_id) => tab_id !== id);
	delete state.data[id];
	return state;
};

export const tabsAction = {
	createTab,
	loadTab,
	moveTab,
	updateTab,
	updateActiveTab,
	deleteTab,
};
