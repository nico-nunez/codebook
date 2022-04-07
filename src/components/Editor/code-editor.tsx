import './code-editor.css';
import { useRef } from 'react';
import prettier from 'prettier';
import { editor } from 'monaco-editor';
import {parse} from "@babel/parser";
import traverse from '@babel/traverse';
import parser from 'prettier/parser-babel';
import MonacoJSXHighlighter, { JSXTypes } from 'monaco-jsx-highlighter';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';

JSXTypes.JSXText.options.inlineClassName = require('./syntax.css');

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
    editorRef.current = editor;
    const jsxHighlighter = new MonacoJSXHighlighter(monaco, parse, traverse, editor);
    jsxHighlighter.highlightOnDidChangeModelContent(100);
    jsxHighlighter.addJSXCommentCommand();
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
      singleQuote: true,
    }).replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-small" onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        onMount={onEditorMount}
        onChange={onEditorInputChange}
        value={initialValue}
        height="500px"
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
