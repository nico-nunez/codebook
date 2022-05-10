import { CellActionType } from '../action-types';
import { CellTypes, SavedCell } from '../cell';

export type CellDirection = 'up' | 'down';

export interface CreateCellAction {
	type: CellActionType.CREATE_CELL;
	payload: {
		id: number;
		cell_type: CellTypes;
	};
}

export interface LoadCellAction {
	type: CellActionType.LOAD_CELL;
	payload: SavedCell;
}

export interface MoveCellAction {
	type: CellActionType.MOVE_CELL;
	payload: {
		id: number;
		direction: CellDirection;
	};
}

export interface UpdateCellAction {
	type: CellActionType.UPDATE_CELL;
	payload: {
		id: number;
		content: string | null;
	};
}

export interface DeleteCellAction {
	type: CellActionType.DELETE_CELL;
	payload: {
		id: number;
	};
}

export interface ResetCellsAction {
	type: CellActionType.RESET_CELLS;
	payload: {};
}

export type CellAction =
	| CreateCellAction
	| LoadCellAction
	| MoveCellAction
	| UpdateCellAction
	| DeleteCellAction
	| ResetCellsAction;
