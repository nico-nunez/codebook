import './PageHeader.css';
import { useActions } from '../../hooks';
import { useTypedSelector } from '../../hooks';
import PageName from './PageName';
import HeaderButton from './PageHeaderBtn';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface PageHeaderProps {
	page_name: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ page_name }) => {
	const { newPage, displayModal, saveNewPage } = useActions();
	const savedChanges = useTypedSelector(({ page }) => page.saved_changes);
	const isAuthenticated = useTypedSelector(({ auth }) => auth.isAuthenticated);
	const onImportPage = () => {
		// TODO
		displayModal('alert');
	};

	const onExportPage = () => {
		//TODO
		displayModal('alert');
	};

	const onSavePage = () => {
		if (isAuthenticated) {
			saveNewPage();
		} else {
			displayModal('login');
		}
	};
	const onNewPage = () => {
		newPage();
	};
	return (
		<>
			<ActionBarWrapper>
				<div className="ms-2">
					<div className="action-bar-buttons">
						<HeaderButton
							text="Import"
							onClick={onImportPage}
							disabled={true}
						/>
						<HeaderButton
							text="Export"
							onClick={onExportPage}
							disabled={true}
						/>
					</div>
				</div>
				<PageName page_name={page_name} />
				<div className="me-2">
					<div className="action-bar-buttons">
						<HeaderButton
							text="Save"
							onClick={onSavePage}
							disabled={savedChanges}
						/>
						<HeaderButton text="New" onClick={onNewPage} />
					</div>
				</div>
			</ActionBarWrapper>
		</>
	);
};

export default PageHeader;
