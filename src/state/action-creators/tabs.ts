import { EditorLanguages } from '../../components/Code-Editor/code-editor';
import { TabActionType } from '../action-types';
import {
	CreateTabAction,
	MoveTabAction,
	DeleteTabAction,
	UpdateTabAction,
	TabDirection,
} from '../actions/tabsActions';

export const createTab = (
	cellId: string,
	id: string | null,
	name: string,
	language: EditorLanguages,
	content?: string
): CreateTabAction => {
	return {
		type: TabActionType.CREATE_TAB,
		payload: {
			cellId,
			id,
			name,
			language,
			content,
		},
	};
};

export const moveTab = (id: string, direction: TabDirection): MoveTabAction => {
	return {
		type: TabActionType.MOVE_TAB,
		payload: {
			id,
			direction,
		},
	};
};

export const deleteTab = (id: string): DeleteTabAction => {
	return {
		type: TabActionType.DELETE_TAB,
		payload: {
			id,
		},
	};
};

export const updateTab = (
	id: string,
	language: EditorLanguages,
	content: string
): UpdateTabAction => {
	return {
		type: TabActionType.UPDATE_TAB,
		payload: {
			id,
			language,
			content,
		},
	};
};
