import { store } from '../store';
import { Dispatch } from 'redux';
import { CellTypes, SavedCell } from '../cell';
import { randomId } from '../helpers';
import { CellActionType, TabActionType } from '../action-types';
import { editorLangs } from '../../components/Code-Editor/code-editor';
import { UpdateActiveTabAction, CreateTabAction } from '../actions/tabsActions';
import {
	CreateCellAction,
	LoadCellAction,
	MoveCellAction,
	UpdateCellAction,
	DeleteCellAction,
	ResetCellsAction,
	CellDirection,
} from '../actions/cellsActions';

type NewCellDispatch =
	| CreateCellAction
	| CreateTabAction
	| UpdateActiveTabAction;

export const createCell = (cell_type: CellTypes) => {
	return (dispatch: Dispatch<NewCellDispatch>) => {
		const cell_id = randomId();
		dispatch({
			type: CellActionType.CREATE_CELL,
			payload: {
				id: cell_id,
				cell_type,
			},
		});

		if (cell_type === 'code') {
			for (const lang of editorLangs) {
				dispatch({
					type: TabActionType.CREATE_TAB,
					payload: {
						cell_id,
						code_language: lang,
					},
				});
			}
			dispatch({
				type: TabActionType.UPDATE_ACTIVE_TAB,
				payload: { cell_id, tab_id: null },
			});
		}
	};
};

export const loadCell = (data: SavedCell): LoadCellAction => {
	return {
		type: CellActionType.LOAD_CELL,
		payload: data,
	};
};

export const moveCell = (
	id: number,
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

export const updateCell = (
	id: number,
	content: string
): UpdateCellAction | void => {
	const { cells } = store.getState();
	if (cells.data[id].cell_type === 'text')
		return {
			type: CellActionType.UPDATE_CELL,
			payload: {
				id,
				content,
			},
		};
};

export const deleteCell = (id: number, type: CellTypes): DeleteCellAction => {
	return {
		type: CellActionType.DELETE_CELL,
		payload: { id },
	};
};

export const resetCells = (): ResetCellsAction => {
	return {
		type: CellActionType.RESET_CELLS,
		payload: {},
	};
};
