import MonacoEditor, { OnChange } from '@monaco-editor/react';

export interface CodeEditorProps {
  initialValue: string;
  onInputChange: OnChange;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onInputChange,
}) => {
  return (
    <MonacoEditor
      onChange={onInputChange}
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
      }}
    />
  );
};

export default CodeEditor;
