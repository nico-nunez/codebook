import { Dispatch } from 'redux';
import { CellActionType } from '../action-types';
import { TabActionType } from '../action-types';
import { CreateTabAction } from '../actions';
import {
	CreateCellAction,
	MoveCellAction,
	DeleteCellAction,
	UpdateActiveTabAction,
	UpdateTextCellAction,
	ResetCellsAction,
	CellDirection,
} from '../actions/cellsActions';
import { CellTypes } from '../cell';
import { randomId } from '../helpers';
import { editorLangs } from '../../components/Code-Editor/code-editor';

type NewCellAction = CreateCellAction | CreateTabAction | UpdateActiveTabAction;

export const createCell = (type: CellTypes, content?: string) => {
	return (dispatch: Dispatch<NewCellAction>) => {
		const cellId = randomId();
		dispatch({
			type: CellActionType.CREATE_CELL,
			payload: {
				id: cellId,
				type,
				content,
			},
		});

		if (type === 'code') {
			for (const lang of editorLangs) {
				const tabId = randomId();
				dispatch({
					type: TabActionType.CREATE_TAB,
					payload: {
						cellId,
						id: tabId,
						name: lang,
						language: lang,
						content: '',
					},
				});
			}
			dispatch({
				type: CellActionType.UPDATE_ACTIVE_TAB,
				payload: { id: cellId, tabId: null },
			});
		}
	};
};

export const moveCell = (
	id: string,
	direction: CellDirection
): MoveCellAction => {
	return {
		type: CellActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};

export const deleteCell = (id: string, type: CellTypes): DeleteCellAction => {
	return {
		type: CellActionType.DELETE_CELL,
		payload: { id, type },
	};
};

export const updateActiveTab = (
	id: string,
	tabId: string | null
): UpdateActiveTabAction => {
	return {
		type: CellActionType.UPDATE_ACTIVE_TAB,
		payload: {
			id,
			tabId,
		},
	};
};

export const updateTextCell = (
	id: string,
	content: string
): UpdateTextCellAction => {
	return {
		type: CellActionType.UPDATE_TEXT_CELL,
		payload: {
			id,
			content,
		},
	};
};

export const resetCells = (): ResetCellsAction => {
	return {
		type: CellActionType.RESET_CELLS,
		payload: {},
	};
};
