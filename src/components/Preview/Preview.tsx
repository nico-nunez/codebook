import './preview.css';
import { useEffect, useRef } from 'react';
import { EditorLanguages } from '../Code-Editor/code-editor';

interface PreviewProps {
	code: string;
	error: string | null;
	language: EditorLanguages;
}

export const jsHTML = `
    <html>
      <head></head>
        <body>
          <div id="root"></div>
          <script>
            const handleError = (err, errType='Runtime') => {
              const root = document.querySelector('#root');
              const errText = document.createTextNode(err);
              const header = document.createElement('h4');
              const msg = document.createElement('h3');
              msg.style.color = 'red';
              header.textContent = errType + ' ' + 'error:';
              msg.appendChild(header);
              msg.appendChild(errText);
              root.appendChild(msg);
              console.error(err);
            };

            window.addEventListener('error', event => {
              event.preventDefault();
              handleError(event.error);
            });

            window.addEventListener('message', event => {
              try {
                const {code, error}  = event.data;
                if (!!error) return handleError(error, 'Build');
                eval(code);
              } catch (err) {
                handleError(err);
              };
            });
          </script>
        </body>
    </html>
  `;

const errorHTML = (err: string) => {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  <h2>${err}</h2>
  </body>
</html>`;
};

const Preview: React.FC<PreviewProps> = ({ code, error, language }) => {
	const iframeRef = useRef<any>();
	let srcHTML = jsHTML;
	useEffect(() => {
		if (language === 'html') {
			srcHTML = error ? errorHTML(error) : code;
		}
		if (language === 'javascript') {
			setTimeout(() => {
				iframeRef.current.contentWindow.postMessage({ code, error }, '*');
			}, 50);
		}
		iframeRef.current.srcdoc = srcHTML;
	}, [code, error, language]);

	return (
		<div className="preview-wrapper">
			<iframe
				ref={iframeRef}
				srcDoc={srcHTML}
				sandbox="allow-scripts"
				title="display-results"
			></iframe>
		</div>
	);
};

export default Preview;
