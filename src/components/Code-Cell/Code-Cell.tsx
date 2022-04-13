import './Code-Cell.css';
import { useEffect } from 'react';
import Preview from '../Preview/Preview';
import CodeEditor from '../Code-Editor/code-editor';
import Resizable from '../Resizable/Resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[id]);

	useEffect(() => {
		if (!bundle) {
			createBundle(id, content);
		}
		const timer = setTimeout(async () => {
			createBundle(id, content);
		}, 1000);

		return () => clearTimeout(timer);

		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content, id, createBundle]);

	const onInputChange = (value: string) => {
		updateCell(id, value);
	};

	return (
		<div className="w-50">
			<Resizable direction="vertical">
				<div className="resizable-container">
					<Resizable direction="horiztonal">
						<CodeEditor initialValue={content} onInputChange={onInputChange} />
					</Resizable>
					<div className="progress-wrapper">
						{!bundle || bundle.loading ? (
							<div className="progress-cover">
								<progress className="progress is-small is-primary" max="100">
									Loading...
								</progress>
							</div>
						) : (
							<Preview code={bundle.code} error={bundle.error} />
						)}
					</div>
				</div>
			</Resizable>
		</div>
	);
};

export default CodeCell;
