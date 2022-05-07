import { AuthActionType } from '../action-types';
import { User } from '../user';

export interface RegisterUserAction {
	type: AuthActionType.REGISTER_USER;
	payload: {
		email: string;
		password: string;
		confirmPass: string;
		profile_name: string;
	};
}

export interface LocalLoginAction {
	type: AuthActionType.LOCAL_LOGIN;
	payload: {
		email: string;
		password: string;
	};
}

export interface LogoutUserAction {
	type: AuthActionType.LOGOUT_USER;
	payload: {};
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
	| LocalLoginAction
	| LogoutUserAction
	| LogoutSuccessAction
	| AuthSuccessAction
	| AuthFailureAction;
