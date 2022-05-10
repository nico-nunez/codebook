import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { TabActionType } from '../action-types';
import { SavedTab } from '../tab';

export type TabDirection = 'left' | 'right';

export interface CreateTabAction {
	type: TabActionType.CREATE_TAB;
	payload: {
		cell_id: number;
		code_language: EditorLanguages;
	};
}

export interface LoadTabAction {
	type: TabActionType.LOAD_TAB;
	payload: SavedTab;
}

export interface MoveTabAction {
	type: TabActionType.MOVE_TAB;
	payload: {
		id: number;
		direction: TabDirection;
	};
}

export interface UpdateTabAction {
	type: TabActionType.UPDATE_TAB;
	payload: {
		id: number;
		content: string;
	};
}

export interface DeleteTabAction {
	type: TabActionType.DELETE_TAB;
	payload: {
		id: number;
	};
}

export interface UpdateActiveTabAction {
	type: TabActionType.UPDATE_ACTIVE_TAB;
	payload: {
		cell_id: number;
		tab_id: number | null;
	};
}

export interface ResetTabsAction {
	type: TabActionType.RESET_TABS;
	payload: {};
}

export type TabAction =
	| CreateTabAction
	| LoadTabAction
	| MoveTabAction
	| UpdateTabAction
	| UpdateActiveTabAction
	| DeleteTabAction
	| ResetTabsAction;
