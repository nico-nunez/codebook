export interface NavbarDropdownProps {
	title: string;
	items: string[];
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, items }) => {
	return (
		<div className="navbar-item has-dropdown is-hoverable">
			<span className="navbar-link">{title}</span>
			<div className="navbar-dropdown">
				{items.map((item, i) => (
					<span className="navbar-item" key={i}>
						{item}
					</span>
				))}
			</div>
		</div>
	);
};

export default NavbarDropdown;
