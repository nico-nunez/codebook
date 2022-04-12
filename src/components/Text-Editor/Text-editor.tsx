import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor = () => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(true);
	const [value, setValue] = useState('**Hello world!!!**');

	useEffect(() => {
		const handleClick = (evt: MouseEvent) => {
			if (
				editorRef.current &&
				evt.target &&
				editorRef.current.contains(evt.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener('click', handleClick, { capture: true });
		return () => {
			document.removeEventListener('click', handleClick, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={editorRef} className="text-editor">
				<MDEditor value={value} onChange={(v) => setValue(v || '')} />
			</div>
		);
	}

	return (
		<div onClick={() => setEditing(true)} className="text-editor card">
			<div className="card-content">
				<MDEditor.Markdown source={value} />
			</div>
		</div>
	);
};
export default TextEditor;
