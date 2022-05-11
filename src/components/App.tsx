import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
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
				{/* <Navbar /> */}
				<Routes>
					<Route path="/" element={<Landing />}>
						<Route index element={<Page />} />
						<Route path="pages/:pageId" element={<Page />} />
						{/* <Route path="pages" element={<PublicPages />} /> */}
						{/* <Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} /> */}
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
