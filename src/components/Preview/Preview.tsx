import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  result: string;
  error: string | null;
}

export const html = `
    <html>
      <head></head>
        <body>
          <div id="root"></div>
          <script>
            const handleError = err => {
              const root = document.querySelector('#root');
              const errText = document.createTextNode(err);
              const header = document.createElement('h4');
              const msg = document.createElement('h3');
              msg.style.color = 'red';
              header.textContent = 'Runtime error:';
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
                eval(event.data);
              } catch (err) {
                handleError(err);
              };
            });
          </script>
        </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ result, error }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      if (error) {
        iframeRef.current.contentWindow.postMessage({ error }, '*');
      }
      console.log(result);
      iframeRef.current.contentWindow.postMessage(result, '*');
    }, 50);
  }, [result, error]);

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
