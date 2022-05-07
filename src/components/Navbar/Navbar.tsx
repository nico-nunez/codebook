import './Navbar.css';
import { Link } from 'react-router-dom';
import NavbarDropdown from './Navbar-Drowdown';
import { useTypedSelector } from '../../hooks';
import { useActions, useToggle } from '../../hooks';
import AuthModal from '../AuthModal/AuthModal';

const Navbar = () => {
	const { displayModal } = useActions();
	const { logoutUser } = useActions();
	const auth = useTypedSelector(({ auth }) => auth);
	const renderedButtons = () => {
		if (auth.isAuthenticated && auth.user) {
			return (
				<>
					<NavbarDropdown title="Recent">
						<Link to="">Untitled 1</Link>
						<Link to="">Untitled 2</Link>
						<Link to="">Untitled 3</Link>
						<Link to="">Untitled 4</Link>
						<Link to="">Untitled 5</Link>
					</NavbarDropdown>
					<NavbarDropdown title={auth.user.profile_name}>
						<Link to="">Profile</Link>
						<Link to="">Pages</Link>
						<span
							style={{
								borderBottom: '1px solid rgba(255,255,255,0.2)',
								marginBottom: '5px',
							}}
						></span>
						<Link to="/" onClick={() => logoutUser()}>
							Logout
						</Link>
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
				<span className="navbar-item brand-name">Codebook</span>
			</div>

			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						{!auth.loading && renderedButtons()}
					</div>
				</div>
			</div>
			<AuthModal />
		</nav>
	);
};

export default Navbar;
