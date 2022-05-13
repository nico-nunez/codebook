import './PageHeader.css';
import PageName from './PageName';
import HeaderButton from './PageHeaderBtn';
import { useCurrentPage, useTypedSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';
import { useActions, useToggle, useNewPage } from '../../hooks';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';

interface PageHeaderProps {
	page_name: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ page_name }) => {
	const { displayModal, saveNewPage, saveExistingPage, deleteSavedPage } =
		useActions();
	const [showDeleteModal, setShowDeleteModal] = useToggle();
	const isSaved = useTypedSelector(({ pages: { current } }) => current.saved);
	const loading = useTypedSelector(({ pages: { loading } }) => loading);
	const auth = useTypedSelector(({ auth }) => auth);
	const page = useCurrentPage();
	const navigate = useNavigate();
	const isAuthor = auth.user && auth.user.id === page.user_id;

	const onDeletePage = () => {
		deleteSavedPage(page.id as number, navigate);
		setShowDeleteModal(false);
	};
	const onSaveClick = () => {
		if (!auth.isAuthenticated) {
			displayModal('login');
			return;
		}
		if (auth.isAuthenticated && !page.user_id) {
			saveNewPage(navigate);
			return;
		}
		if (auth.isAuthenticated && isAuthor) {
			saveExistingPage();
		}
	};
	const onNewPage = useNewPage();

	return (
		<>
			<ActionBarWrapper>
				<div className="ms-2 action-bar-start">
					<div className="action-bar-buttons">
						<HeaderButton
							className={loading ? 'is-loading' : ''}
							text={isAuthor ? 'Save' : 'Save As'}
							onClick={onSaveClick}
							disabled={isSaved}
						/>
						{isAuthor && (
							<HeaderButton
								text="Delete"
								onClick={() => setShowDeleteModal(true)}
								className={`is-danger delete-page-btn ${
									loading && 'is-loading'
								}`}
							/>
						)}
					</div>
				</div>
				<PageName page_name={page_name} />
				<div className="me-2 action-bar-end">
					<div className="action-bar-buttons">
						<HeaderButton text="New" onClick={onNewPage} />
					</div>
				</div>
			</ActionBarWrapper>
			<DeleteModal
				active={showDeleteModal}
				onConfirmClick={onDeletePage}
				onCancelClick={() => setShowDeleteModal(false)}
			/>
		</>
	);
};

export default PageHeader;
