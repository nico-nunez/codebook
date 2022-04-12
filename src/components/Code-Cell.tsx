import { useEffect, useState } from 'react';
import bundler from '../bundler';

import Preview from './Preview/Preview';
import CodeEditor from './Code-Editor/code-editor';
import Resizable from './Resizable/Resizable';

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const { code, error } = await bundler(input);
			setCode(code);
			setError(error);
		}, 1000);

		return () => clearTimeout(timer);
	}, [input]);

	const onInputChange = (value: string) => {
		setInput(value);
	};

	return (
		<div className="w-50">
			<Resizable direction="vertical">
				<div className="resizable-container">
					<Resizable direction="horiztonal">
						<CodeEditor
							initialValue="const a = 1;"
							onInputChange={onInputChange}
						/>
					</Resizable>
					<Preview result={code} error={error} />
				</div>
			</Resizable>
		</div>
	);
};

export default CodeCell;
