import { EditorLanguages } from '../components/Code-Editor/code-editor';
import { useTypedSelector } from './use-type-selector';

export const useCumulativeCode = (
	cellId: string,
	language: EditorLanguages
) => {
	return useTypedSelector(({ tabs }) => {
		const cumulative: string[] = [];
		for (const tab of tabs.order[cellId]) {
			if (tabs.data[tab].language === language) {
				cumulative.push(tabs.data[tab].content);
			}
		}
		return cumulative;
	}).join('\n');
};
