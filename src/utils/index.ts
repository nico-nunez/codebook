import { store, TabsState } from '../state';
import bundle from '../bundler';
import { BundleState } from '../state/reducers/bundlesReducer';

export const saveStore = () => {
	// const { page, cells, tabs } = store.getState();
	// localStorage.setItem('__store', JSON.stringify({ page, cells, tabs }));
	localStorage.setItem('__store', JSON.stringify(store.getState()));
};

export const restoreBundles = async (tabs: TabsState) => {
	const bundles: BundleState = {};
	const tabsArr = Object.values(tabs.data);
	tabsArr.forEach(async (tab) => {
		const { cellId, language, content } = tab;
		const { code } = await bundle(content, language);
		if (bundles[cellId]) {
			bundles[cellId].code[language] = code;
		} else {
			bundles[cellId] = {
				loading: false,
				error: '',
				warning: '',
				code: { [language]: code },
			};
		}
	});
	return bundles;
};

export * from './form-validation';
