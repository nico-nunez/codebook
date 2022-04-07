import * as esbuild from 'esbuild-wasm';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect, useRef, useState } from 'react';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

import Preview from './components/Preview/Preview';
import CodeEditor from './components/Editor/code-editor';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const esbuildRef = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  const onClick = async () => {
    if (!esbuildRef.current) return;
    setError(null);
    try {
      const result = await esbuildRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });
      setCode(result.outputFiles[0].text);
    } catch (err: any) {
      setError(err);
    }
  };

  const onInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="m-2">
      <CodeEditor initialValue="const a = 1;" onInputChange={onInputChange} />
      <div className="m-3">
        <button
          className="button button-format is-primary mg-medium"
          onClick={onClick}
        >
          Submit
        </button>
      </div>
      <Preview result={code} error={error} />
    </div>
  );
};

export default App;
