interface ActionButtonProps {
	onClick: () => void;
	icon?: string;
	text?: string;
	active?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	icon,
	text,
	active = false,
}) => {
	const renderedIcon = () => {
		return (
			<span className="icon">
				<i className={`fa-solid ${icon}`}></i>
			</span>
		);
	};
	return (
		<button
			className={`button is-small ${active && 'active'}`}
			onClick={onClick}
		>
			{icon && renderedIcon()}
			{text}
		</button>
	);
};

export default ActionButton;
