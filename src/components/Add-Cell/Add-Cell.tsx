import './Add-Cell.css';
import { useActions } from '../../hooks';

interface AddCellProps {
	nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
	const { insertCellBefore } = useActions();

	return (
		<div className="add-cell-wrapper">
			<div className="add-cell-divider"></div>
			<button
				className="button is-rounded"
				onClick={() => insertCellBefore(nextCellId, 'code')}
			>
				+ Code
			</button>
			<button
				className="button is-rounded"
				onClick={() => insertCellBefore(nextCellId, 'text')}
			>
				+ Text
			</button>
		</div>
	);
};

export default AddCell;
