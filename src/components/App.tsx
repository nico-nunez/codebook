import { Provider } from 'react-redux';
import { store } from '../state';
import Navbar from './Navbar/Navbar';
import CellsPage from './Page/Page';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<Navbar />
				<CellsPage />
			</div>
		</Provider>
	);
};

export default App;
