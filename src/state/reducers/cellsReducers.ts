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
	(state: CellState = initialState, action: Action): CellState => {
		switch (action.type) {
			case ActionType.UPDATE_CELL:
				state.data[action.payload.id].content = action.payload.content;
				return state;

			case ActionType.DELETE_CELL:
				delete state.data[action.payload.id];
				state.order = state.order.filter((id) => id !== action.payload.id);
				return state;

			case ActionType.MOVE_CELL:
				const { direction } = action.payload;
				const index = state.order.indexOf(action.payload.id);
				const targetIndex = direction === 'up' ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex >= state.order.length) return state;
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;
				return state;

			case ActionType.INSERT_CELL_BEFORE:
				const newCell: Cell = {
					content: action.payload.content || '',
					type: action.payload.type,
					id: randomId(),
				};
				state.data[newCell.id] = newCell;
				const foundIndex = action.payload.id
					? state.order.indexOf(action.payload.id)
					: -1;

				foundIndex < 0
					? state.order.push(newCell.id)
					: state.order.splice(foundIndex, 0, newCell.id);

				return state;
			default:
				return state;
		}
	},
	initialState
);

const randomId = () => {
	return Math.random().toString(36).substring(2, 9);
};

export default reducer;
