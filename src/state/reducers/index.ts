import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import cellsReducer from './cellsReducer';
import tabsReducer from './tabsReducer';
import bundlesReducer from './bundlesReducer';
import authReducer from './aurthReducer';
import modalReducer from './modalReducer';

const reducers = combineReducers({
	page: pageReducer,
	cells: cellsReducer,
	tabs: tabsReducer,
	bundles: bundlesReducer,
	auth: authReducer,
	modal: modalReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
