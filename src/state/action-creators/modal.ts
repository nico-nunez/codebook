import { ModalActionType } from '../action-types';
import { DisplayModalAction, HideModalAction } from '../actions';

export const displayModal = (modalName: string): DisplayModalAction => {
	return {
		type: ModalActionType.DISPLAY_MODAL,
		payload: {
			modalName,
		},
	};
};

export const hideModal = (): HideModalAction => {
	return {
		type: ModalActionType.HIDE_MODAL,
		payload: {},
	};
};
