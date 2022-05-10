import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from './state';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import AlertModal from './components/AlertModal';
import AuthModal from './components/AuthModal/AuthModal';
import ProgressBarModal from './components/ProgressBarModal';

const container = document.querySelector('#root');

if (container) {
	const root = createRoot(container);
	root.render(
		<Provider store={store}>
			<App />
			<AuthModal />
			<AlertModal />
			<ProgressBarModal />
		</Provider>
	);
}
