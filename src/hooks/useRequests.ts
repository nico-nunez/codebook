import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { Page } from '../state';
// import { axiosInst } from '../utils';

export const getPages = async (): Promise<Page[]> => {
	const { data }: AxiosResponse<Page[]> = await axios.get('/pages');
	return data;
};
