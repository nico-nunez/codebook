import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
export interface CodeEditorProps {
  initialValue: string;
  onInputChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onInputChange,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const onEditorMount: OnMount = (editor, monaco) => {
    if (editor) editorRef.current = editor;
  };

  const onEditorInputChange: OnChange = (value, evt) => {
    if (value) onInputChange(value);
  };

  const onFormatClick = () => {
    if (!editorRef.current) return;
    const unformatted = editorRef.current.getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        onMount={onEditorMount}
        onChange={onEditorInputChange}
        value={initialValue}
        height="500px"
        width="70%"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
