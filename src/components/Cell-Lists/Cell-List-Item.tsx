import './Cell-List-Item.css';
import TextEditor from '../Text-Editor/Text-editor';
import CodeCell from '../Code-Cell/Code-Cell';
import { Cell } from '../../state';

import ActionBar from '../Action-Bar/Action-Bar';

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return (
		<div className="cell-list-item">
			<div className="action-bar-wrapper">
				<ActionBar id={cell.id} />
			</div>
			{cell.type === 'code' ? (
				<CodeCell cell={cell} />
			) : (
				<TextEditor cell={cell} />
			)}
		</div>
	);
};

export default CellListItem;
