import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { TabActionType } from '../action-types';

export type TabDirection = 'left' | 'right';

export interface CreateTabAction {
	type: TabActionType.CREATE_TAB;
	payload: {
		cellId: string;
		id: string | null;
		name: string;
		language: EditorLanguages;
		content?: string;
	};
}

export interface MoveTabAction {
	type: TabActionType.MOVE_TAB;
	payload: {
		id: string;
		direction: TabDirection;
	};
}

export interface DeleteTabAction {
	type: TabActionType.DELETE_TAB;
	payload: {
		id: string;
	};
}

export interface UpdateTabAction {
	type: TabActionType.UPDATE_TAB;
	payload: {
		id: string;
		language?: EditorLanguages;
		content?: string;
	};
}

export interface ResetTabsAction {
	type: TabActionType.RESET_TABS;
	payload: {};
}

export type TabAction =
	| CreateTabAction
	| MoveTabAction
	| DeleteTabAction
	| UpdateTabAction
	| ResetTabsAction;
