import './Cells-Page-Header.css';
import ActionBar from '../Action-Bar/Action-Bar';
import DropdownItem from '../Dropdown/Dropdown-item';
import DropdownMenu from '../Dropdown/Dropdown-menu';

const CellsPageHeader = () => {
	const onImportPage = () => {
		// TODO
		console.log('import page');
	};

	const onNewPage = () => {
		//TODO
		console.log('new page');
	};

	const onEditTitle = () => {
		//TODO
		console.log('edit title');
	};

	return (
		<ActionBar>
			<div className="action-bar-button">
				<button className="button is-small is-rounded" onClick={onImportPage}>
					Import Page
				</button>
			</div>
			<div className="page-title">
				<span className="is-size-4 ml-6">Page Title</span>
				<i className="fa-solid fa-pencil" onClick={onEditTitle}></i>
			</div>
			<div className="action-bar-button">
				<button
					className="button is-small is-light is-rounded"
					onClick={onNewPage}
				>
					New Page
				</button>
			</div>
		</ActionBar>
	);
};

export default CellsPageHeader;
