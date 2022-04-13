import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
	code: string;
	error: string | null;
}

export const html = `
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

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframeRef = useRef<any>();
	useEffect(() => {
		iframeRef.current.srcdoc = html;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage({ code, error }, '*');
		}, 50);
	}, [code, error]);

	return (
		<div className="preview-wrapper">
			<iframe
				ref={iframeRef}
				srcDoc={html}
				sandbox="allow-scripts"
				title="display-results"
			></iframe>
		</div>
	);
};

export default Preview;
