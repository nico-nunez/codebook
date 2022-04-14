import { Provider } from 'react-redux';
import { store } from '../state';
import CellList from './Cell-Lists/Cell-List';
import Navbar from './Navbar/Navbar';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<Navbar />
				<CellList />
			</div>
		</Provider>
	);
};

export default App;
