import React from 'react';
import { useActions } from '../../hooks';
import { CellTypes } from '../../state';
import ActionBarWrapper from './Action-Bar-Wrapper';
import ActionButton from './Action-Button';

interface ActionBarControlsProps {
	id: string;
	type: CellTypes;
}

const ActionBarControls: React.FC<ActionBarControlsProps> = ({ id, type }) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<div className="action-bar-end">
			<ActionButton onClick={() => moveCell(id, 'up')} icon="fa-arrow-up" />
			<ActionButton onClick={() => moveCell(id, 'down')} icon="fa-arrow-down" />
			<ActionButton onClick={() => deleteCell(id, type)} icon="fa-trash-can" />
		</div>
	);
};

export default ActionBarControls;
