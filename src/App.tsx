import { OnChange } from '@monaco-editor/react';
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from './components/code-editor';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const esbuildRef = useRef<any>();
  const iframeRef = useRef<any>();

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
    iframeRef.current.srcdoc = html;
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
      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        '*'
      );
    } catch (err) {
      iframeRef.current.contentWindow.postMessage({ error: err }, '*');
    }
  };

  const onInputChange: OnChange = (value, event) => {
    if (value) setInput(value);
  };

  const html = `
    <html>
      <head></head>
        <body>
          <div id="root"></div>
          <script>
            window.addEventListener('message', event => {
              try {
                const { error } = event.data;
                if (error) throw error;
                eval(event.data);
              } catch (err) {
                const root = document.querySelector('#root');
                const errText = document.createTextNode(err);
                const header = document.createElement('h4');
                const msg = document.createElement('div');
                msg.style.color = 'red';
                header.textContent = 'Runtime error';
                msg.appendChild(header);
                msg.appendChild(errText);
                root.appendChild(msg);
                console.error(err);
              };
            });
          </script>
        </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" onInputChange={onInputChange} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        width="700px"
        height="500px"
        title="display-results"
      ></iframe>
    </div>
  );
};

export default App;
