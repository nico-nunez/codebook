import produce from 'immer';
import { CellAction } from '../actions';
import { CellActionType } from '../action-types';
import { CellsState, initialCellsState, cellsActions } from '../helpers';

const reducer = produce(
	(state: CellsState = initialCellsState, action: CellAction): CellsState => {
		switch (action.type) {
			case CellActionType.CREATE_CELL:
				return cellsActions.createCell(state, action);

			case CellActionType.MOVE_CELL:
				return cellsActions.moveCell(state, action);

			case CellActionType.DELETE_CELL:
				return cellsActions.deleteCell(state, action);

			case CellActionType.UPDATE_ACTIVE_TAB:
				return cellsActions.updateActiveTab(state, action);

			case CellActionType.UPDATE_TEXT_CELL:
				return cellsActions.updateTextCell(state, action);
			default:
				return state;
		}
	},
	initialCellsState
);

export default reducer;
