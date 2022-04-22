import { useEffect } from 'react';
import { useActions } from '../../hooks';
import ActionBarControls from '../Action-Bar/Action-Bar-Controls';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';
import ActionButton from '../Action-Bar/Action-Button';
interface ActionBarProps {
	id: string;
	tabs: string[];
	activeTabId?: string;
}

const CodeCellActionBar: React.FC<ActionBarProps> = ({
	id,
	tabs = [],
	activeTabId,
}) => {
	const onTabClick = () => console.log('Active Tab');
	const renderedTabs = tabs.map((tab, i) => (
		<ActionButton
			text={tab}
			key={i}
			onClick={onTabClick}
			active={activeTabId === tab}
		/>
	));
	return (
		<ActionBarWrapper>
			<div className="action-bar-start">{renderedTabs}</div>
			<ActionBarControls id={id} type="code" />
		</ActionBarWrapper>
	);
};

export default CodeCellActionBar;
