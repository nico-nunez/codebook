import { Dispatch } from 'redux';
import { CellActionType, PageActionType } from '../action-types';
import { TabActionType } from '../action-types';
import { CreateTabAction } from '../actions';
import {
	CreateCellAction,
	MoveCellAction,
	DeleteCellAction,
	UpdateCodeCellAction,
	UpdateTextCellAction,
	CellDirection,
} from '../actions/cellsActions';
import { CellTypes } from '../cell';
import { randomId } from '../helpers';

type NewCellAction = CreateCellAction | CreateTabAction | UpdateCodeCellAction;

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
			const tabId = randomId();
			dispatch({
				type: TabActionType.CREATE_TAB,
				payload: {
					cellId,
					id: tabId,
					language: 'html',
					content: '',
				},
			});
			dispatch({
				type: CellActionType.UPDATE_CODE_CELL,
				payload: { id: cellId, activeTabId: tabId },
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

export const updateCodeCell = (
	id: string,
	activeTabId: string
): UpdateCodeCellAction => {
	return {
		type: CellActionType.UPDATE_CODE_CELL,
		payload: {
			id,
			activeTabId,
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
