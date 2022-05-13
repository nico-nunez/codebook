import { Cell, SavedCell } from '../models';
import {
	CreateCellAction,
	LoadCellAction,
	UpdateCellAction,
	DeleteCellAction,
	MoveCellAction,
} from '../actions';

export interface CellsState {
	order: number[];
	data: {
		[key: number]: Cell;
	};
}

export const initialCellsState: CellsState = {
	order: [],
	data: {},
};

export const createCell = (
	state: CellsState,
	action: CreateCellAction
): CellsState => {
	const { id, cell_type } = action.payload;
	state.order.push(id);
	const newCell = {
		id,
		cell_type,
		content: null,
	};
	state.data[id] = newCell;
	return state;
};

export const loadCell = (
	state: CellsState,
	action: LoadCellAction
): CellsState => {
	const cell: SavedCell = { ...action.payload };
	state.order.push(cell.id);
	state.data[cell.id] = cell;
	return state;
};

export const moveCell = (
	state: CellsState,
	action: MoveCellAction
): CellsState => {
	const { id, direction } = action.payload;
	const index = state.order.indexOf(id);
	const targetIndex = direction === 'up' ? index - 1 : index + 1;
	if (targetIndex < 0 || targetIndex >= state.order.length) return state;
	state.order[index] = state.order[targetIndex];
	state.order[targetIndex] = id;
	return state;
};

export const updateTextCell = (
	state: CellsState,
	action: UpdateCellAction
): CellsState => {
	const { id, content } = action.payload;
	state.data[id].content = content;
	return state;
};

export const deleteCell = (
	state: CellsState,
	action: DeleteCellAction
): CellsState => {
	const { id } = action.payload;
	state.order = state.order.filter((cell_id) => cell_id !== id);
	delete state.data[id];
	return state;
};