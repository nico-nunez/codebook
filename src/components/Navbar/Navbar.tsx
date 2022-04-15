import './Navbar.css';
import Modal from '../Modal';
import { useToggle } from '../../hooks';
import { NavbarDropdownProps } from './Navbar-Drowdown';
import NavbarDropdown from './Navbar-Drowdown';

const recentsProps: NavbarDropdownProps = {
	title: 'Recents',
	items: ['Untitled-1', 'Untitled-2', 'Untitled-3', 'Untitled-4'],
};

const userProps: NavbarDropdownProps = {
	title: 'Username',
	items: ['Profile', 'Pages'],
};

const Navbar = () => {
	const [showModal, setShowModal] = useToggle();
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<span className="navbar-item brand-name">Codebook</span>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					<NavbarDropdown {...recentsProps} />
					<NavbarDropdown {...userProps} />
					<div className="navbar-item">
						<div className="buttons">
							<span className="button is-primary" onClick={setShowModal}>
								<strong>Sign up</strong>
							</span>
							<span className="button is-light" onClick={setShowModal}>
								Log in
							</span>
						</div>
					</div>
				</div>
			</div>
			<Modal active={showModal} onClick={setShowModal} />
		</nav>
	);
};

export default Navbar;
