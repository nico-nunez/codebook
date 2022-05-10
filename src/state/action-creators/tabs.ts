import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { TabActionType } from '../action-types';
import { SavedTab } from '../models';
import {
	CreateTabAction,
	LoadTabAction,
	MoveTabAction,
	UpdateTabAction,
	UpdateActiveTabAction,
	DeleteTabAction,
	ResetTabsAction,
	TabDirection,
} from '../actions/tabsActions';

export const createTab = (
	cell_id: number,
	code_language: EditorLanguages,
	content: string | null
): CreateTabAction => {
	return {
		type: TabActionType.CREATE_TAB,
		payload: {
			cell_id,
			code_language,
		},
	};
};

export const loadTab = (data: SavedTab): LoadTabAction => {
	return {
		type: TabActionType.LOAD_TAB,
		payload: data,
	};
};

export const moveTab = (id: number, direction: TabDirection): MoveTabAction => {
	return {
		type: TabActionType.MOVE_TAB,
		payload: {
			id,
			direction,
		},
	};
};

export const updateTab = (id: number, content: string): UpdateTabAction => {
	return {
		type: TabActionType.UPDATE_TAB,
		payload: {
			id,
			content,
		},
	};
};

export const updateActiveTab = (
	cell_id: number,
	tab_id: number | null
): UpdateActiveTabAction => {
	return {
		type: TabActionType.UPDATE_ACTIVE_TAB,
		payload: {
			cell_id,
			tab_id,
		},
	};
};
export const deleteTab = (id: number): DeleteTabAction => {
	return {
		type: TabActionType.DELETE_TAB,
		payload: {
			id,
		},
	};
};

export const resetTabs = (): ResetTabsAction => {
	return {
		type: TabActionType.RESET_TABS,
		payload: {},
	};
};
