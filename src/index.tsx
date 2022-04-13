import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(<App />);
}
