export * from './cellsReducerHelpers';
export * from './tabsReducerHelpers';

// import { store } from '../store';
// import { ActionType } from '../action-types';
// import { initialContent } from '../cell';
// import { EditorLanguages } from '../../components/Code-Editor/code-editor';

// const createNewCell = (content?: string, language?: EditorLanguages) => {
// 	store.dispatch({
// 		type: ActionType.INSERT_CELL_AFTER,
// 		payload: {
// 			id: null,
// 			type: language ? 'code' : 'text',
// 			language: language,
// 			content: content || '',
// 		},
// 	});
// };

// export const generateDefaultCells = () => {
// 	createNewCell(initialContent['html'], 'html');
// 	createNewCell(initialContent['text']);
// };

export const randomId = () => {
	return Math.random().toString(36).substring(2, 9);
};
