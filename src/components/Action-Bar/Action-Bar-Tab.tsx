import React from 'react';
import { useActions } from '../../hooks';

interface ActionBarTabProps {
	tabId: string;
	tabName: string;
	isActive: boolean;
	cellId: string;
}

export const ActionBarTab: React.FC<ActionBarTabProps> = ({
	cellId,
	tabId,
	tabName,
	isActive,
}) => {
	const { updateActiveTab } = useActions();
	return (
		<div
			className={`action-bar-tab button is-small ${isActive && 'active'}`}
			onClick={() => updateActiveTab(cellId, tabId)}
		>
			<span>{tabName}</span>
		</div>
	);
};

export default ActionBarTab;
