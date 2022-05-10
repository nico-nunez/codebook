interface PageHeaderBtnProps {
	text: string;
	onClick: () => void;
	disabled?: boolean;
}

const PageHeaderBtn: React.FC<PageHeaderBtnProps> = ({
	text,
	onClick,
	disabled,
}) => {
	return (
		<button
			className="button is-small is-rounded"
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default PageHeaderBtn;
