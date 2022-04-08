import { useEffect, useState } from 'react';
import bundler from '../bundler';

import Preview from './Preview/Preview';
import CodeEditor from './Editor/code-editor';
import Resizable from './Resizable/Resizable';

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const timer = setTimeout(async () => {
			setError(null);
			try {
				const output = await bundler(input);
				setCode(output);
			} catch (err: any) {
				setError(err);
			}
		}, 1250);

		return () => clearTimeout(timer);
	}, [input]);

	// const onClick = async () => {
	// setError(null);
	// try {
	//   const output = await bundler(input);
	//   setCode(output);
	// } catch (err: any) {
	//   setError(err);
	// }
	// };

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
