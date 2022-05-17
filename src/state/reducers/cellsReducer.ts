import produce from 'immer';
import { CellAction } from '../actions';
import { CellActionType } from '../action-types';
import {
	CellsState,
	initialCellsState,
	createCell,
	loadCell,
	moveCell,
	deleteCell,
	updateCell,
} from '../helpers';

const reducer = produce(
	(state: CellsState = initialCellsState, action: CellAction): CellsState => {
		switch (action.type) {
			case CellActionType.CREATE_CELL:
				return createCell(state, action);

			case CellActionType.LOAD_CELL:
				return loadCell(state, action);

			case CellActionType.MOVE_CELL:
				return moveCell(state, action);

			case CellActionType.DELETE_CELL:
				return deleteCell(state, action);

			case CellActionType.UPDATE_CELL:
				return updateCell(state, action);

			case CellActionType.RESET_CELLS:
				state = initialCellsState;
				return state;

			default:
				return state;
		}
	},
	initialCellsState
);

export default reducer;
