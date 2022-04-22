import { randomId } from '.';
import {
	CreateCellAction,
	DeleteCellAction,
	MoveCellAction,
	UpdateCodeCellAction,
	UpdateTextCellAction,
} from '../actions';
import { Cell, CellTypes, Code_Cell, Text_Cell } from '../cell';

type CellDetails = {
	id: string;
	type: CellTypes;
};

export interface CellsState {
	order: CellDetails[];
	code: { [key: string]: Code_Cell };
	text: { [key: string]: Text_Cell };
}

export const initialCodeState: Code_Cell = {
	id: '',
	type: 'code',
	activeTab: '',
};

export const initialTextState: Text_Cell = {
	id: '',
	type: 'text',
	content: '',
};

export const initialCellsState: CellsState = {
	order: [],
	code: {},
	text: {},
};

const createCell = (state: CellsState, action: CreateCellAction) => {
	const { id, type, content = '' } = action.payload;
	const newCell =
		type === 'code'
			? ({ ...initialCodeState, id } as Code_Cell)
			: ({ ...initialTextState, id, content } as Text_Cell);

	state.order.push({ id, type });
	state[type][id] = newCell;
	return state;
};

const moveCell = (state: CellsState, action: MoveCellAction) => {
	const { id, direction } = action.payload;
	const index = state.order.findIndex((cell) => cell.id === id);
	const targetIndex = direction === 'up' ? index - 1 : index + 1;
	if (targetIndex < 0 || targetIndex >= state.order.length) return state;
	const cellCopy = { ...state.order[index] };
	state.order[index] = state.order[targetIndex];
	state.order[targetIndex] = cellCopy;
	return state;
};

const deleteCell = (state: CellsState, action: DeleteCellAction) => {
	const { id, type } = action.payload;
	delete state[type][id];
	state.order = state.order.filter((cell) => cell.id !== id);
	return state;
};

const updateCodeCell = (state: CellsState, action: UpdateCodeCellAction) => {
	const { id, activeTabId } = action.payload;
	state.code[id].activeTab = activeTabId;
	return state;
};

const updateTextCell = (state: CellsState, action: UpdateTextCellAction) => {
	const { id, content } = action.payload;
	state.text[id].content = content || '';
	return state;
};

export const cellsActions = {
	createCell,
	moveCell,
	deleteCell,
	updateCodeCell,
	updateTextCell,
};
