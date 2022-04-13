import { useEffect } from 'react';

import Preview from './Preview/Preview';
import CodeEditor from './Code-Editor/code-editor';
import Resizable from './Resizable/Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[id]);

	useEffect(() => {
		const timer = setTimeout(async () => {
			createBundle(id, content);
		}, 1000);

		return () => clearTimeout(timer);
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
					{bundle && <Preview code={bundle.code} error={bundle.error} />}
				</div>
			</Resizable>
		</div>
	);
};

export default CodeCell;
