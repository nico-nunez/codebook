import './Cell.css';
import TextCell from '../Text-Cell/Text-Cell';
import CodeCell from '../Code-Cell/Code-Cell';
import { CellTypes } from '../../state';
import { useTypedSelector } from '../../hooks';

interface CellItemProps {
	id: string;
	type: CellTypes;
}

const CellItem: React.FC<CellItemProps> = ({ id, type }) => {
	const cell = useTypedSelector(({ cells }) => cells[type][id]);
	// <REMOVE ---
	console.log('cell render id:', id);
	// ---/>
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

export default CellItem;
