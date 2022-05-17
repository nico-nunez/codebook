import { AuthActionType } from '../action-types';
import { User } from '../models';

export interface RegisterUserAction {
	type: AuthActionType.REGISTER_USER;
	payload: {
		email: string;
		password: string;
		confirmPass: string;
		profile_name: string;
	};
}

export interface LogoutSuccessAction {
	type: AuthActionType.LOGOUT_SUCCESS;
	payload: {};
}

export interface AuthSuccessAction {
	type: AuthActionType.AUTH_SUCCESS;
	payload: {
		user: User;
	};
}

export interface AuthFailureAction {
	type: AuthActionType.AUTH_FAILURE;
	payload: {
		errors: string[] | null;
	};
}

export interface AuthenticateSessionAction {
	type: AuthActionType.AUTHENTICATE_SESSION;
	payload: {};
}

export type AuthAction =
	| RegisterUserAction
	| LogoutSuccessAction
	| AuthSuccessAction
	| AuthFailureAction;
