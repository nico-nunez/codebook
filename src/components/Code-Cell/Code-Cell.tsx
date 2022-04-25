import './Code-Cell.css';
import { useEffect } from 'react';
import Preview from '../Preview/Preview';
import CodeEditor from '../Code-Editor/code-editor';
import Resizable from '../Resizable/Resizable';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector, useCumulativeCode } from '../../hooks';
import { Code_Cell, Tab } from '../../state';

interface CodeCellProps {
	cell: Code_Cell;
}

export interface TabsData {
	[key: string]: Tab;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { createBundle, updateTab } = useActions();
	const tabsData = useTypedSelector(({ tabs }) => {
		const tabsData = tabs.order[cell.id].map((id) => tabs.data[id]);
		return tabsData;
	});
	const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
	const {
		id: tabId,
		language,
		content,
	} = tabsData.find((tab) => tab.id === cell.activeTab) || tabsData[0];
	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, language, content);
		}
		const timer = setTimeout(async () => {
			createBundle(cell.id, language, content);
		}, 1000);
		return () => clearTimeout(timer);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabId, content, language, cell.id, createBundle]);

	const onInputChange = (value: string) => {
		updateTab(tabId, language, value);
	};
	return (
		<>
			<div className="code-cell">
				<Resizable direction="vertical">
					<div className="resizable-container">
						<Resizable direction="horiztonal">
							<CodeEditor
								initialValue={content || ''}
								language={language}
								onInputChange={onInputChange}
							/>
						</Resizable>
						<div className="progress-wrapper">
							{!bundle || bundle.loading ? (
								<div className="progress-cover">
									<progress className="progress is-small is-primary" max="100">
										Loading...
									</progress>
								</div>
							) : (
								<Preview
									code={bundle.code}
									error={bundle.error || bundle.warning}
								/>
							)}
						</div>
					</div>
				</Resizable>
			</div>
		</>
	);
};

export default CodeCell;
