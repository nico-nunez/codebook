import './PageHeader.css';
import ActionBarWrapper from '../Action-Bar/Action-Bar-Wrapper';
import PageName from './PageName';
import { useToggle } from '../../hooks';
import Modal from '../Modal';
import { useActions } from '../../hooks';

interface PageHeaderProps {
	pageName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
	const [showModal, toggleModal] = useToggle(false);
	const { newPage } = useActions();
	const onImportPage = () => {
		// TODO
		toggleModal();
	};

	const onNewPage = () => {
		newPage();
	};

	const onExportPage = () => {
		//TODO
		toggleModal();
	};

	const onSavePage = () => {
		//TODO
		toggleModal();
	};
	return (
		<>
			<ActionBarWrapper>
				<div>
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
			<Modal active={showModal} onClick={toggleModal} />
		</>
	);
};

export default PageHeader;
