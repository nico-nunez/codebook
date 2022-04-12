import { Provider } from 'react-redux';
import { store } from './state';
import CodeCell from './components/Code-Cell';
import TextEditor from './components/Text-Editor/Text-editor';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				{/* <CodeCell /> */}
				<TextEditor />
			</div>
		</Provider>
	);
};

export default App;
