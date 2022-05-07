export type CellTypes = 'code' | 'text';

export interface Cell {
	id: string;
	type: CellTypes;
}

export interface Code_Cell extends Cell {
	type: 'code';
	activeTab: string | null;
}

export type Text_Cell = Cell & { type: 'text'; content: string };

type cellType = {
	id: number;
	page_id: number;
	cell_type: CellTypes;
	content: string | null;
	order_index: number;
	created_at: Date;
	updated_at: Date;
};
