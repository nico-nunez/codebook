import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

export interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const reducer = produce(
	(state: CellState = initialState, action: Action): CellState | void => {
		switch (action.type) {
			case ActionType.UPDATE_CELL:
				state.data[action.payload.id].content = action.payload.content;
				return;

			case ActionType.DELETE_CELL:
				delete state.data[action.payload.id];
				state.order = state.order.filter((id) => id !== action.payload.id);
				return;

			case ActionType.MOVE_CELL:
				const { direction } = action.payload;
				const index = state.order.indexOf(action.payload.id);
				const targetIndex = direction === 'up' ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex >= state.order.length) return;
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;
				return;

			case ActionType.INSERT_CELL_BEFORE:
				const newCell: Cell = {
					content: '',
					type: action.payload.type,
					id: randomId(),
				};

				state.data[newCell.id] = newCell;

				return state;
			default:
				return state;
		}
	}
);

const randomId = () => {
	return Math.random().toString(36).substring(2, 9);
};

console.log(randomId());

export default reducer;
