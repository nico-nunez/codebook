import { CellActionType } from '../action-types';
import { CellTypes } from '../cell';

export type CellDirection = 'up' | 'down';

export interface CreateCellAction {
	type: CellActionType.CREATE_CELL;
	payload: {
		id: string;
		type: CellTypes;
		content?: string;
	};
}

export interface MoveCellAction {
	type: CellActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: CellDirection;
	};
}

export interface DeleteCellAction {
	type: CellActionType.DELETE_CELL;
	payload: {
		id: string;
		type: CellTypes;
	};
}

export interface UpdateCodeCellAction {
	type: CellActionType.UPDATE_CODE_CELL;
	payload: {
		id: string;
		activeTabId: string;
	};
}

export interface UpdateTextCellAction {
	type: CellActionType.UPDATE_TEXT_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export type CellAction =
	| CreateCellAction
	| MoveCellAction
	| DeleteCellAction
	| UpdateCodeCellAction
	| UpdateTextCellAction;
