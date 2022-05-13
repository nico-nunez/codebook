import React, { useState } from 'react';
import { CellTypes } from '../../state';
import { useActions, useToggle } from '../../hooks';
import ActionButton from './Action-Button';
import DeleteModal from '../Modals/DeleteModal';

interface ActionBarControlsProps {
	id: number;
	type: CellTypes;
}

const ActionBarControls: React.FC<ActionBarControlsProps> = ({ id, type }) => {
	const { moveCell, deleteCell, updateSavedStatus } = useActions();
	const [showDeleteModal, setShowDeleteModal] = useToggle();

	const onMoveUp = () => {
		moveCell(id, 'up');
		updateSavedStatus(false);
	};

	const onMoveDown = () => {
		moveCell(id, 'down');
		updateSavedStatus(false);
	};

	const onDeleteCell = () => {
		deleteCell(id, type);
		updateSavedStatus(false);
	};

	return (
		<div className="action-bar-end">
			<ActionButton onClick={() => moveCell(id, 'up')} icon="fa-arrow-up" />
			<ActionButton onClick={() => moveCell(id, 'down')} icon="fa-arrow-down" />
			<ActionButton
				onClick={() => setShowDeleteModal(true)}
				icon="fa-trash-can"
			/>
			<DeleteModal
				active={showDeleteModal}
				onConfirmClick={onDeleteCell}
				onCancelClick={() => setShowDeleteModal(false)}
			/>
		</div>
	);
};

export default ActionBarControls;
