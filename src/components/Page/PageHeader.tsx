import './PageHeader.css';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';
import PageName from './PageName';

interface PageHeaderProps {
	pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
	const onImportPage = () => {
		// TODO
		console.log('import page');
	};

	const onNewPage = () => {
		//TODO

		console.log('new page');
	};

	const onExportPage = () => {
		//TODO
		console.log('export page');
	};

	const onSavePage = () => {
		//TODO
		console.log('save page');
	};
	return (
		<ActionBarWrapper>
			<div>
				<div className="action-bar-buttons">
					<button className="button is-small is-rounded" onClick={onImportPage}>
						Import
					</button>
					<button className="button is-small is-rounded" onClick={onExportPage}>
						Export
					</button>
				</div>
			</div>
			<PageName name={pageName} />
			<div>
				<div className="action-bar-buttons">
					<button className="button is-small is-rounded" onClick={onSavePage}>
						Save
					</button>
					<button className="button is-small is-rounded" onClick={onNewPage}>
						New
					</button>
				</div>
			</div>
		</ActionBarWrapper>
	);
};

export default PageHeader;
