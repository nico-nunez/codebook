import './Navbar.css';
import { Link } from 'react-router-dom';
import NavbarDropdown from './Navbar-Drowdown';
import { useTypedSelector, useActions, useNewPage } from '../../hooks';

const Navbar = () => {
	const { displayModal, logoutUser } = useActions();
	const auth = useTypedSelector(({ auth }) => auth);
	const recent = useTypedSelector(({ pages: { recent } }) => recent);
	const data = useTypedSelector(({ pages: { data } }) => data);
	const renderedNavLinks = () => {
		if (auth.isAuthenticated && auth.user) {
			return (
				<>
					<NavbarDropdown title="Recent">
						{recent.map((id) => {
							return (
								<Link to={`/pages/${id}`} key={id}>
									{data[id] && data[id].page_name}
								</Link>
							);
						})}
					</NavbarDropdown>
					<NavbarDropdown title={auth.user.profile_name}>
						<Link to={`/users/${auth.user.id}`}>Profile</Link>
						<Link to={`/users/${auth.user.id}/pages`}>Pages</Link>
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
				<Link to="/" className="navbar-item brand-name" onClick={useNewPage()}>
					Codebook
				</Link>
			</div>
			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						{!auth.loading && renderedNavLinks()}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
