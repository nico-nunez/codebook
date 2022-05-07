import { ModalActionType } from '../action-types';

export interface DisplayModalAction {
	type: ModalActionType.DISPLAY_MODAL;
	payload: {
		modalName: string;
	};
}

export interface HideModalAction {
	type: ModalActionType.HIDE_MODAL;
	payload: {};
}

export type ModalAction = DisplayModalAction | HideModalAction;
