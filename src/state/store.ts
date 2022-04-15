import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { initialContentCode, initialContentText } from './cell';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
	type: ActionType.INSERT_CELL_BEFORE,
	payload: { id: null, type: 'code', content: initialContentCode },
});
store.dispatch({
	type: ActionType.INSERT_CELL_BEFORE,
	payload: { id: null, type: 'text', content: initialContentText },
});
