import { useActions } from '../../hooks';
import ActionBar from '../Action-Bar/Action-Bar';
import ActionButton from '../Action-Bar/Action-Button';

interface ActionBarProps {
	id: string;
}

const CellHeader: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<ActionBar>
			<div className="action-bar-end">
				<ActionButton onClick={() => moveCell(id, 'up')} icon="fa-arrow-up" />
				<ActionButton
					onClick={() => moveCell(id, 'down')}
					icon="fa-arrow-down"
				/>
				<ActionButton onClick={() => deleteCell(id)} icon="fa-trash-can" />
			</div>
		</ActionBar>
	);
};

export default CellHeader;
