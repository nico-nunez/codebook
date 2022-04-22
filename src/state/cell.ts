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
