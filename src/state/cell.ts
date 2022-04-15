export type CellTypes = 'code' | 'text';

export interface Cell {
	id: string;
	type: CellTypes;
	content: string;
}

export const initialContentCode = `// Auto import npm packages:
import React from 'react'; 
import { render } from 'react-dom';
// Supports js/jsx:
const root = document.querySelector('#root');
const App = () => <h1>Hello!</h1>;
render(<App/>, root);
`;

export const initialContentText = 'Click to edit';
