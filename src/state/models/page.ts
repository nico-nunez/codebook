import { SavedCell } from './cell';
import { SavedTab } from './tab';

export interface Page {
	id: number;
	page_name: string;
}
export interface SavedPage {
	id: number;
	page_name: string;
	created_at: Date;
	updated_at: Date;
	user_id: number;
}

export interface FullPage {
	page: SavedPage;
	cells: SavedCell[];
	tabs: SavedTab[];
}
