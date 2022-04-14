import './Navbar.css';

const Navbar = () => {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item brand-name" href="#">
					Codebook
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item has-dropdown is-hoverable">
						<a className="navbar-link">Recent</a>

						<div className="navbar-dropdown">
							<a className="navbar-item">Untitled-1</a>
							<a className="navbar-item">Untitled-2</a>
							<a className="navbar-item">Untitled-3</a>
							<a className="navbar-item">Untitled-4</a>
						</div>
					</div>
					<div className="navbar-item is-hoverable">
						<a className="navbar-item">Aoife</a>

						<div className="navbar-dropdown">
							<a className="navbar-item">Profile</a>
							<a className="navbar-item">Pages</a>
						</div>
					</div>
					<div className="navbar-item">
						<div className="buttons">
							<a className="button is-primary">
								<strong>Sign up</strong>
							</a>
							<a className="button is-light">Log in</a>
						</div>
					</div>
				</div>

				{/* <div className="navbar-end">
				
				</div> */}
			</div>
		</nav>
	);
};

export default Navbar;
