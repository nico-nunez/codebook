import { Provider } from 'react-redux';
import { store } from '../state';
import Navbar from './Navbar/Navbar';
import Page from './Page/Page';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<Navbar />
				<Page />
			</div>
		</Provider>
	);
};

export default App;
