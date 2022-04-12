import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}

export interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: {
		id: string;
	};
}

export interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export interface InsertCellBeforeAction {
	type: ActionType.INSERT_CELL_BEFORE;
	payload: {
		id: string;
		type: CellTypes;
	};
}

export type Direction = 'up' | 'down';

export type Action =
	| MoveCellAction
	| DeleteCellAction
	| InsertCellBeforeAction
	| UpdateCellAction;