import { useEffect, useState } from 'react';
import bundler from '../bundler';

import Preview from './Preview/Preview';
import CodeEditor from './Code-Editor/code-editor';
import Resizable from './Resizable/Resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, error } = await bundler(content);
      setCode(code);
      setError(error);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

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
          <Preview result={code} error={error} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
