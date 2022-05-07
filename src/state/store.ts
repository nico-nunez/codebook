import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import watch from 'redux-watch';
import { toggleSaved } from './helpers';

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
const watchPage = watch(store.getState, 'page.page_name');

store.subscribe(watchCells(toggleSaved(store)));
store.subscribe(watchTabs(toggleSaved(store)));
store.subscribe(watchPage(toggleSaved(store)));
