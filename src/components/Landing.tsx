import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const Landing = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Landing;
