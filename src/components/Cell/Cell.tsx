import './Cell.css';
import TextCell from '../Text-Cell/Text-Cell';
import CodeCell from '../Code-Cell/Code-Cell';
import { CellTypes } from '../../state';
import { useTypedSelector } from '../../hooks';
import CodeCellActionBar from '../Code-Cell/Code-Cell-Action-Bar';

interface CellItemProps {
	id: string;
	type: CellTypes;
}

const CellItem: React.FC<CellItemProps> = ({ id, type }) => {
	const cell = useTypedSelector(({ cells }) => cells[type][id]);
	const renderCell = () => {
		if (cell.type === 'code') {
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
