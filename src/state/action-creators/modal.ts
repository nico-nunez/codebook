import { ModalActionType } from '../action-types';

export const displayModal = (modalName: string) => {
	return {
		type: ModalActionType.DISPLAY_MODAL,
		payload: {
			modalName,
		},
	};
};

export const hideModal = () => {
	return {
		type: ModalActionType.HIDE_MODAL,
		payload: {},
	};
};
