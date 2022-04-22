import ActionBarControls from '../Action-Bar/Action-Bar-Controls';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface ActionBarProps {
	id: string;
}

const TextCellActionBar: React.FC<ActionBarProps> = ({ id }) => {
	return (
		<ActionBarWrapper>
			<ActionBarControls id={id} type="text" />
		</ActionBarWrapper>
	);
};

export default TextCellActionBar;
