import { combineReducers } from 'redux';
import pageReducer from './pageReducers';
import bundlesReducer from './bundlesReducers';

const reducers = combineReducers({
	page: pageReducer,
	bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
