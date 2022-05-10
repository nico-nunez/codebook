import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Page from './Page/Page';
import { useEffect } from 'react';
import { useActions } from '../hooks';

const App = () => {
	const { authenticateSession } = useActions();
	useEffect(() => {
		authenticateSession();
		return;
	}, [authenticateSession]);

	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Page />}>
						{/* <Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} /> */}
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
