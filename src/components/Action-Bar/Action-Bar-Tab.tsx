import React from 'react';
import { useActions } from '../../hooks';

interface ActionBarTabProps {
	tab_id: number;
	code_langauge: string;
	isActive: boolean;
	cell_id: number;
}

export const ActionBarTab: React.FC<ActionBarTabProps> = ({
	cell_id,
	tab_id,
	code_langauge,
	isActive,
}) => {
	const { updateActiveTab } = useActions();
	return (
		<div
			className={`action-bar-tab button is-small ${isActive && 'active'}`}
			onClick={() => updateActiveTab(cell_id, tab_id)}
		>
			<span>{code_langauge}</span>
		</div>
	);
};

export default ActionBarTab;
