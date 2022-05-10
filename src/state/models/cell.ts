export type CellTypes = 'code' | 'text';

export interface Cell {
	id: number;
	cell_type: CellTypes;
	content: string | null;
}

export interface SavedCell {
	id: number;
	page_id: number;
	cell_type: CellTypes;
	content: string | null;
	order_index: number;
	created_at: Date;
	updated_at: Date;
}
