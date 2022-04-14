import './Navbar.css';
import { useState } from 'react';
import Modal from '../Modal';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	const onClick = () => {
		setShowModal((state) => !state);
	};

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<span className="navbar-item brand-name">Codebook</span>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item has-dropdown is-hoverable">
						<a className="navbar-link">Recent</a>

						<div className="navbar-dropdown">
							<span className="navbar-item">Untitled-1</span>
							<span className="navbar-item">Untitled-2</span>
							<span className="navbar-item">Untitled-3</span>
							<span className="navbar-item">Untitled-4</span>
						</div>
					</div>
					<div className="navbar-item is-hoverable">
						<span className="navbar-item">Aoife</span>

						<div className="navbar-dropdown">
							<span className="navbar-item">Profile</span>
							<span className="navbar-item">Pages</span>
						</div>
					</div>
					<div className="navbar-item">
						<div className="buttons">
							<span className="button is-primary" onClick={onClick}>
								<strong>Sign up</strong>
							</span>
							<span className="button is-light" onClick={onClick}>
								Log in
							</span>
						</div>
					</div>
				</div>
			</div>
			<Modal active={showModal} onClick={onClick} />
		</nav>
	);
};

export default Navbar;
