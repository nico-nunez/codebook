import './Code-Cell.css';
import { useEffect } from 'react';
import Preview from '../Preview/Preview';
import CodeEditor, { EditorLanguages } from '../Code-Editor/code-editor';
import Resizable from '../Resizable/Resizable';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector, useCumulativeCode } from '../../hooks';
import CodeCellActionBar from './Code-Cell-Action-Bar';
import { Code_Cell, Tab } from '../../state';
import { shallowEqual } from 'react-redux';

interface CodeCellProps {
	cell: Code_Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { createBundle, updateTab } = useActions();
	const { tabsOrder, activeTab } = useTypedSelector(({ tabs }) => {
		const tabsOrder = tabs.order[cell.id];
		const activeTab = tabs.data[cell.activeTab];
		return { tabsOrder, activeTab };
	});
	const bundle = useTypedSelector(
		({ bundles }) => bundles[cell.id],
		shallowEqual
	);
	const { id: tabId, language, content } = activeTab;
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
			<CodeCellActionBar id={cell.id} tabs={tabsOrder} />
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
									error={bundle.error}
									language={language}
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
