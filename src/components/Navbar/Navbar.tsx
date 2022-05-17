import './Navbar.css';
import NavbarDropdown from './Navbar-Drowdown';
import {
	useTypedSelector,
	useActions,
	useNewPage,
	useToggle,
	useBlockNav,
} from '../../hooks';
import DiscardModal from '../Modals/DiscardModal';
import AuthModal from '../Modals/AuthModal/AuthModal';

const Navbar = () => {
	const [showAuthModal, setShowAuthModal] = useToggle();
	const { blockNav, showBlockModal, toggleBlockModal } = useBlockNav();
	const { logoutUser } = useActions();
	const newPage = useNewPage();
	const auth = useTypedSelector(({ auth }) => auth);
	const data = useTypedSelector(({ pages: { data } }) => data);
	const recent = useTypedSelector(({ pages: { recent } }) => recent);
	const renderedNavLinks = () => {
		if (auth.isAuthenticated && auth.user) {
			return (
				<>
					<NavbarDropdown title="Recent">
						{recent
							.slice(-5)
							.reverse()
							.map((id) => {
								return (
									<a
										href={`/pages/${id}`}
										key={id}
										onClick={(e) => blockNav(e)}
									>
										{data[id] && data[id].page_name}
									</a>
								);
							})}
					</NavbarDropdown>
					<NavbarDropdown title={auth.user.profile_name}>
						<a href={`/users/${auth.user.id}`} onClick={(e) => blockNav(e)}>
							Profile
						</a>
						<a
							href={`/users/${auth.user.id}/pages`}
							onClick={(e) => blockNav(e)}
						>
							My Pages
						</a>
						<span
							style={{
								borderBottom: '1px solid rgba(200,200,200,0.2)',
								marginBottom: '5px',
							}}
						></span>
						<a href="/" onClick={(e) => blockNav(e, () => logoutUser)}>
							Logout
						</a>
					</NavbarDropdown>
				</>
			);
		}
		return (
			<div className="buttons">
				<span
					onClick={() => setShowAuthModal(true)}
					className="button is-primary"
				>
					Login
				</span>
			</div>
		);
	};

	return (
		<>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a
						href="/"
						className="navbar-item brand-name"
						onClick={(e) => {
							blockNav(e, () => newPage);
						}}
					>
						Codebook
					</a>
				</div>
				<div className="navbar-menu">
					<div className="navbar-end">
						<div className="navbar-item">
							{!auth.loading && renderedNavLinks()}
						</div>
					</div>
				</div>
			</nav>
			{showAuthModal && (
				<AuthModal
					active={showAuthModal}
					onCancel={() => setShowAuthModal(false)}
				/>
			)}
			{showBlockModal && (
				<DiscardModal
					active={showBlockModal}
					onConfirmClick={() => blockNav(null)}
					onCancelClick={() => toggleBlockModal(false)}
				/>
			)}
		</>
	);
};

export default Navbar;
