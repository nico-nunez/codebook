import { PageActionType } from '../action-types';
import { MyStore } from '../store';

export * from './cellsReducerHelpers';
export * from './tabsReducerHelpers';
export * from './newPage';
export const randomId = () => {
	return Math.random().toString(36).substring(2, 9);
};

export const toggleSaved = (store: MyStore) => {
	return () => {
		const { page } = store.getState();
		if (page.saved_changes) {
			store.dispatch({
				type: PageActionType.UPDATE_SAVED_CHANGES,
				payload: { saved_changes: false },
			});
		}
	};
};
