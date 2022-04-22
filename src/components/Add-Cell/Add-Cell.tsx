import './Add-Cell.css';
import { useActions } from '../../hooks';

interface AddCellProps {
	showCodeButton: boolean;
	showTextButton: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
	showCodeButton,
	showTextButton,
}) => {
	const { createCell } = useActions();
	return (
		<div className="add-cell-wrapper">
			<div className="add-cell-divider"></div>
			{showCodeButton && (
				<button
					className="button is-rounded"
					onClick={() => createCell('code')}
				>
					+ Code
				</button>
			)}
			{showTextButton && (
				<button
					className="button is-rounded"
					onClick={() => createCell('text')}
				>
					+ Text
				</button>
			)}
		</div>
	);
};

export default AddCell;
