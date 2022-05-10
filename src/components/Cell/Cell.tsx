import './Cell.css';
import TextCell from '../Text-Cell/Text-Cell';
import CodeCell from '../Code-Cell/Code-Cell';
import { useTypedSelector } from '../../hooks';
import CodeCellActionBar from '../Code-Cell/Code-Cell-Action-Bar';

interface CellItemProps {
	id: number;
}

const CellItem: React.FC<CellItemProps> = ({ id }) => {
	const cell = useTypedSelector(({ cells }) => cells.data[id]);
	const renderCell = () => {
		if (!cell) return;
		if (cell.cell_type === 'code') {
			return (
				<>
					<CodeCellActionBar cell={cell} />
					<CodeCell cell={cell} />
				</>
			);
		} else {
			return <TextCell cell={cell} />;
		}
	};
	return <div className="cell-list-item">{renderCell()}</div>;
};

export default CellItem;
