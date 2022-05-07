import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { AuthActionType, ModalActionType } from '../action-types';
import { AuthAction } from '../actions/authActions';
import { ModalAction } from '../actions/modalActions';
import { User } from '../user';

interface Registration {
	profile_name: string;
	email: string;
	password: string;
	confirmPass: string;
}

interface UserLogin {
	email: string;
	password: string;
}

axios.defaults.withCredentials = true;

export const registerUser = (userData: Registration) => {
	return async (dispatch: Dispatch<AuthAction | ModalAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.post(
				'/api/auth/register',
				{
					...userData,
				}
			);
			dispatch({
				type: AuthActionType.AUTH_SUCCESS,
				payload: {
					user: data,
				},
			});
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
		} catch (err: any) {
			dispatch({
				type: AuthActionType.AUTH_FAILURE,
				payload: {
					errors: err.response.data.error.messages,
				},
			});
		}
	};
};

export const loginUser = (loginData: UserLogin) => {
	return async (dispatch: Dispatch<AuthAction | ModalAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.post(
				'/api/auth/login',
				{
					...loginData,
				}
			);
			dispatch({
				type: AuthActionType.AUTH_SUCCESS,
				payload: {
					user: data,
				},
			});
			dispatch({
				type: ModalActionType.HIDE_MODAL,
				payload: {},
			});
		} catch (err: any) {
			console.dir(err);
			dispatch({
				type: AuthActionType.AUTH_FAILURE,
				payload: {
					errors: err.response.data.error.messages,
				},
			});
		}
	};
};

export const logoutUser = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			await axios.get('/api/auth/logout');
			dispatch({
				type: AuthActionType.LOGOUT_SUCCESS,
				payload: {},
			});
		} catch (err: any) {
			dispatch({
				type: AuthActionType.AUTH_FAILURE,
				payload: {
					errors: err.response.data.error.messages,
				},
			});
		}
	};
};

export const authenticateSession = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			const { data }: AxiosResponse<User> = await axios.get(
				'/api/auth/authenticate_session'
			);
			if (data.profile_name) {
				dispatch({
					type: AuthActionType.AUTH_SUCCESS,
					payload: {
						user: data,
					},
				});
			} else {
				dispatch({
					type: AuthActionType.AUTH_FAILURE,
					payload: {
						errors: null,
					},
				});
			}
		} catch (err: any) {
			dispatch({
				type: AuthActionType.AUTH_FAILURE,
				payload: {
					errors: err.response.data.error.messages,
				},
			});
		}
	};
};
