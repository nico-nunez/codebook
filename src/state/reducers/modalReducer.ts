import produce from 'immer';
import { ModalAction } from '../actions';
import { ModalActionType } from '../action-types';

export interface ModalState {
	display: boolean;
	modalName: string | null;
}

const initialState = {
	display: false,
	modalName: null,
};

const reducer = produce(
	(state: ModalState = initialState, action: ModalAction) => {
		switch (action.type) {
			case ModalActionType.DISPLAY_MODAL:
				state.display = true;
				state.modalName = action.payload.modalName;
				return state;

			case ModalActionType.HIDE_MODAL:
				state.display = false;
				state.modalName = null;
				return state;

			default:
				return state;
		}
	},
	initialState
);

export default reducer;
