import './Action-Bar.css';
import { useActions } from '../../hooks';
import ActionButton from './Action-Button';

interface ActionBarProps {
	id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<div className="action-bar">
			<ActionButton onClick={() => moveCell(id, 'up')} icon="fa-arrow-up" />
			<ActionButton onClick={() => moveCell(id, 'down')} icon="fa-arrow-down" />
			<ActionButton onClick={() => deleteCell(id)} icon="fa-trash-can" />
		</div>
	);
};

export default ActionBar;
