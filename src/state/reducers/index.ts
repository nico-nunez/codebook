import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import cellsReducer from './cellsReducer';
import tabsReducer from './tabsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
	page: pageReducer,
	cells: cellsReducer,
	tabs: tabsReducer,
	bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
