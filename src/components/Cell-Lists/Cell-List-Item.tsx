import './Cell-List-Item.css';
import TextEditor from '../Text-Editor/Text-editor';
import CodeCell from '../Code-Cell/Code-Cell';
import { Cell } from '../../state';

import CellHeader from './Cell-List-Item-Header';

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return (
		<div className="cell-list-item">
			<CellHeader id={cell.id} />
			{cell.type === 'code' ? (
				<CodeCell cell={cell} />
			) : (
				<TextEditor cell={cell} />
			)}
		</div>
	);
};

export default CellListItem;
