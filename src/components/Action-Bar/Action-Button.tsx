interface ActionButtonProps {
	onClick: () => void;
	icon: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon }) => {
	return (
		<button className="button is-small" onClick={onClick}>
			<span className="icon">
				<i className={`fa-solid ${icon}`}></i>
			</span>
		</button>
	);
};

export default ActionButton;
