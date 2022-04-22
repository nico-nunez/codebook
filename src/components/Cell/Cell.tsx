import './Cell.css';
import TextCell from '../Text-Cell/Text-Cell';
import CodeCell from '../Code-Cell/Code-Cell';
import { Code_Cell, Text_Cell } from '../../state';

interface CellListItemProps {
	cell: Code_Cell | Text_Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return (
		<div className="cell-list-item">
			{cell.type === 'code' ? (
				<CodeCell cell={cell} />
			) : (
				<TextCell cell={cell} />
			)}
		</div>
	);
};

export default CellListItem;
