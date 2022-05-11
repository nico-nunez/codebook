import './PageHeader.css';
import PageName from './PageName';
import { useActions } from '../../hooks';
import HeaderButton from './PageHeaderBtn';
import { useTypedSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface PageHeaderProps {
	page_name: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ page_name }) => {
	const navigate = useNavigate();
	const { newPage, displayModal, saveNewPage, saveExistingPage } = useActions();
	const page = useTypedSelector(({ page }) => page);
	const auth = useTypedSelector(({ auth }) => auth);
	const onImportPage = () => {
		// TODO
		displayModal('alert');
	};

	const onExportPage = () => {
		//TODO
		displayModal('alert');
	};

	const onSavePage = () => {
		if (!auth.isAuthenticated) {
			displayModal('login');
			return;
		}
		if (auth.isAuthenticated && !page.user_id) {
			saveNewPage(navigate);
			return;
		}
		if (auth.isAuthenticated && auth.user && auth.user.id === page.user_id) {
			saveExistingPage();
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
							disabled={page.saved_changes}
						/>
						<HeaderButton text="New" onClick={onNewPage} />
					</div>
				</div>
			</ActionBarWrapper>
		</>
	);
};

export default PageHeader;
