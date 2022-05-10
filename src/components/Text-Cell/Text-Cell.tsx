import './Text-Cell.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../../hooks/useActions';
import { Cell, SavedCell } from '../../state';
import TextCellActionBar from './Text-Cell-Action-Bar';

interface TextCellProps {
	cell: Cell | SavedCell;
}

const TextCell: React.FC<TextCellProps> = ({ cell: { content, id } }) => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updateCell } = useActions();

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
				<MDEditor
					value={content || ''}
					onChange={(v = '') => updateCell(id, v)}
				/>
			</div>
		);
	}

	return (
		<>
			<TextCellActionBar id={id} />
			<div onClick={() => setEditing(true)} className="text-editor card">
				<div className="card-content">
					<MDEditor.Markdown source={content || 'Click to edit'} />
				</div>
			</div>
		</>
	);
};
export default TextCell;
