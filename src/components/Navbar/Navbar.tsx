import './Navbar.css';
import { Link } from 'react-router-dom';
import NavbarDropdown from './Navbar-Drowdown';
import { useTypedSelector } from '../../hooks';
import { useActions } from '../../hooks';

const Navbar = () => {
	const { displayModal } = useActions();
	const { logoutUser } = useActions();
	const auth = useTypedSelector(({ auth }) => auth);
	const renderedButtons = () => {
		if (auth.isAuthenticated && auth.user) {
			return (
				<>
					<NavbarDropdown title="Recent"></NavbarDropdown>
					<NavbarDropdown title={auth.user.profile_name}>
						<Link to="">Profile</Link>
						<Link to="">Pages</Link>
						<span
							style={{
								borderBottom: '1px solid rgba(200,200,200,0.2)',
								marginBottom: '5px',
							}}
						></span>
						<a href="/" onClick={() => logoutUser()}>
							Logout
						</a>
					</NavbarDropdown>
				</>
			);
		}
		return (
			<div className="buttons">
				<span
					onClick={() => displayModal('login')}
					className="button is-primary"
				>
					Login
				</span>
			</div>
		);
	};

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link to="/" className="navbar-item brand-name">
					Codebook
				</Link>
			</div>
			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						{!auth.loading && renderedButtons()}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
