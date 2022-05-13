import thunk from 'redux-thunk';
import watch from 'redux-watch';
import reducers from './reducers';
import { PagesActionType } from './action-types';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const savedState = () => {
	const savedState = localStorage.getItem('__store');
	localStorage.clear();
	return savedState ? JSON.parse(savedState) : {};
};

export const store = createStore(
	reducers,
	savedState(),
	composeEnhancers(applyMiddleware(thunk))
);
export type MyStore = typeof store;

const watchCells = watch(store.getState, 'cells');
const watchTabs = watch(store.getState, 'tabs');

const toggleSaved = () => {
	return () => {
		const { pages } = store.getState();
		if (pages.current.saved) {
			store.dispatch({
				type: PagesActionType.UPDATE_SAVED_STATUS,
				payload: { saved: false },
			});
		}
	};
};
store.subscribe(watchCells(toggleSaved()));
store.subscribe(watchTabs(toggleSaved()));
