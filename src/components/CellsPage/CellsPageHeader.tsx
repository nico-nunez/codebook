import './CellsPageHeader.css';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

const PageHeader = () => {
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
	const onUpdateName = () => {
		//TODO
		console.log('update name');
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
			<div className="page-title">
				<span className="is-size-4 ml-6">Page Title</span>
				<i className="fa-solid fa-pencil" onClick={onUpdateName}></i>
			</div>
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
