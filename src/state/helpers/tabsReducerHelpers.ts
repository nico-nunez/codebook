import {
	DeleteTabAction,
	CreateTabAction,
	MoveTabAction,
	UpdateTabAction,
} from '../actions';
import { randomId } from '../helpers';
import { Tab } from '../tab';

export interface TabsState {
	order: {
		[key: string]: string[];
	};
	data: {
		[key: string]: Tab;
	};
}

export const initialTabsState: TabsState = {
	order: {},
	data: {},
};

const createTab = (state: TabsState, action: CreateTabAction) => {
	const { cellId, id, name, content, language } = action.payload;
	const newTab: Tab = {
		id: id || randomId(),
		cellId,
		name,
		language,
		content: content || '',
	};
	if (!state.order[cellId]) state.order[cellId] = [];
	state.order[cellId].push(newTab.id);
	state.data[newTab.id] = newTab;
	return state;
};

const moveTab = (state: TabsState, action: MoveTabAction) => {
	const { id, direction } = action.payload;
	const cellId = state.data[id].cellId;
	const index = state.order[cellId].indexOf(id);
	const targetIndex = direction === 'left' ? index - 1 : index + 1;
	if (targetIndex < 0 || targetIndex >= state.order[cellId].length) {
		return state;
	}
	state.order[cellId][index] = state.order[cellId][targetIndex];
	state.order[cellId][targetIndex] = id;
	return state;
};

const deleteTab = (state: TabsState, action: DeleteTabAction) => {
	const { id } = action.payload;
	const cellId = state.data[id].cellId;
	state.order[cellId] = state.order[cellId].filter((tabId) => tabId !== id);
	delete state.data[id];
	return state;
};

const updateTab = (state: TabsState, action: UpdateTabAction) => {
	const { id, language, content } = action.payload;
	if (content !== undefined) {
		state.data[id].content = content;
	}
	if (language !== undefined) {
		state.data[id].language = language;
	}
	return state;
};

export const tabsAction = {
	createTab,
	moveTab,
	deleteTab,
	updateTab,
};
