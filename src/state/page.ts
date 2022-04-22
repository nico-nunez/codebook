import { Cell } from './cell';

export interface Page {
	id: string;
	name: string;
	order: Cell[];
	imports: string[];
}
