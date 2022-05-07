import './PageHeader.css';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';
import PageName from './PageName';
import { useToggle, useTypedSelector } from '../../hooks';
import AlertModal from '../AlertModal';
import { useActions } from '../../hooks';

interface PageHeaderProps {
	pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
	const { newPage, displayModal } = useActions();
	const { updateSavedChanges } = useActions();
	const savedChanges = useTypedSelector(({ page }) => page.saved_changes);
	const onImportPage = () => {
		// TODO
		displayModal('alert');
	};

	const onExportPage = () => {
		//TODO
		displayModal('alert');
	};

	const onSavePage = () => {
		//TODO
		updateSavedChanges(true);
	};
	const onNewPage = () => {
		newPage();
	};
	return (
		<>
			<ActionBarWrapper>
				<div className="ms-2">
					<div className="action-bar-buttons">
						<button
							className="button is-small is-rounded"
							onClick={onImportPage}
						>
							Import
						</button>
						<button
							className="button is-small is-rounded"
							onClick={onExportPage}
						>
							Export
						</button>
					</div>
				</div>
				<PageName name={pageName} />
				<div className="me-2">
					<div className="action-bar-buttons">
						<button
							className="button is-small is-rounded"
							onClick={onSavePage}
							disabled={savedChanges}
						>
							Save
						</button>
						<button className="button is-small is-rounded" onClick={onNewPage}>
							New
						</button>
					</div>
				</div>
			</ActionBarWrapper>
			<AlertModal />
		</>
	);
};

export default PageHeader;
