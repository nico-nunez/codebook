import { createRoot } from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import App from './components/App';

const container = document.querySelector('#root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
