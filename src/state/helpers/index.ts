import { PageActionType } from '../action-types';
import { MyStore } from '../store';

export * from './cellsReducerHelpers';
export * from './tabsReducerHelpers';
export const randomId = () => {
	return Math.round(Math.random() * 1000000);
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
