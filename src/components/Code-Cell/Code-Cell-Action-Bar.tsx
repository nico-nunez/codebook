import { Code_Cell } from '../../state';
import { shallowEqual } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import ActionBarTab from '../Action-Bar/Action-Bar-Tab';
import ActionBarControls from '../Action-Bar/Action-Bar-Controls';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface ActionBarProps {
	cell: Code_Cell;
}

const CodeCellActionBar: React.FC<ActionBarProps> = ({ cell }) => {
	const order = useTypedSelector(({ tabs }) => tabs.order[cell.id]);
	const tabNames = useTypedSelector(
		({ tabs }) => order.map((id) => tabs.data[id].name),
		shallowEqual
	);
	const activeTab = cell.activeTab || order[0];
	const renderedTabs = order.map((id, i) => {
		return (
			<ActionBarTab
				cellId={cell.id}
				tabId={id}
				tabName={tabNames[i]}
				isActive={activeTab === id}
				key={id}
			/>
		);
	});
	return (
		<ActionBarWrapper>
			<div className="action-bar-start">{renderedTabs}</div>
			<ActionBarControls id={cell.id} type="code" />
		</ActionBarWrapper>
	);
};

export default CodeCellActionBar;
