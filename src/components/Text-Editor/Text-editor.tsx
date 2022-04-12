import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../../hooks/use-actions';
import { Cell } from '../../state';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: { content, id } }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(true);
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
        <MDEditor value={content} onChange={(v) => updateCell(id, v || '')} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};
export default TextEditor;
