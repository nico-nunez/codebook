import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const esbuildRef = useRef<any>();
  const iframeRef = useRef<any>();

  useEffect(() => {
    startService();
  },[]);

  const startService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };


  const onClick = async () => {
    if (!esbuildRef.current) return;
    const result = await esbuildRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html =
  `
    <html>
      <head></head>
        <body>
          <div id="root"></div>
          <script>
            window.addEventListener('message', event => {
              try {
                eval(event.data);
              } catch (err) {
                console.log(err);
              };
            });
          </script>
        </body>
    </html>
  `;

  return (
    <div>
      <textarea 
        onChange={e => setInput(e.target.value)}
        value={input}
        rows={20}
        cols={80}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe 
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
        width="700px"
        height="500px"
      >
      </iframe>
    </div>
  );
}

export default App;