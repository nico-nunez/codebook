import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import bundler from './bundler';

import Preview from './components/Preview/Preview';
import CodeEditor from './components/Editor/code-editor';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const onClick = async () => {
    setError(null);
    try {
      const output = await bundler(input);
      setCode(output);
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
