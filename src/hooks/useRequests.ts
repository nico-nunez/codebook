import axios, { AxiosResponse } from 'axios';
import { Page } from '../state';

export const getPages = async (): Promise<Page[]> => {
	const { data }: AxiosResponse<Page[]> = await axios.get('/pages');
	return data;
};
