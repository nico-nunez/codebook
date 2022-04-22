import { EditorLanguages } from '../components/Code-Editor/code-editor';

export interface Tab {
	id: string;
	cellId: string;
	name: string;
	language: EditorLanguages;
	content: string;
}

export const initialContent = {
	javascript: `// Auto import npm packages:
  import React from 'react'; 
  import { render } from 'react-dom';
  // Supports js/jsx:
  const root = document.querySelector('#root');
  const App = () => <h1>Hello!</h1>;
  render(<App/>, root);
  `,

	html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
  <h1>Hello World!</h1>
  </body>
</html>
`,

	css: '',
};
