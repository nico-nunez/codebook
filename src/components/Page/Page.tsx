import './Page.css';
import CellItem from '../Cell/Cell';
import { CellTypes } from '../../state';
import { shallowEqual } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions } from '../../hooks';
import PageHeader from '../PageHeader/PageHeader';
import AddCell from '../Add-Cell/Add-Cell';

const Page: React.FC = () => {
	const { pageId } = useParams();
	const navigate = useNavigate();
	const { fetchPage, clearError } = useActions();
	const page = useTypedSelector(({ page }) => page);
	const order = useTypedSelector(({ cells }) => cells.order);
	const cellTypes = useTypedSelector(({ cells }) => {
		const types: { [key: number]: CellTypes } = {};
		for (const id in cells.data) {
			types[id] = cells.data[id].cell_type;
		}
		return types;
	}, shallowEqual);
	let showCodeButton = true;
	let showTextButton = true;
	const renderedCells = order.map((cell_id) => {
		const cell_type = cellTypes[cell_id];
		if (cell_type === 'code') showCodeButton = false;
		if (cell_type === 'text') showTextButton = false;
		return (
			<Fragment key={cell_id}>
				<CellItem id={cell_id} />
			</Fragment>
		);
	});

	// HANDLE TOGGLE SAVE & DISMISS ERROR
	useEffect(() => {
		const handleDismissError = () => {
			clearError();
		};
		if (page.error) window.addEventListener('click', handleDismissError, true);
		return () => {
			window.removeEventListener('click', handleDismissError);
		};
	}, [page.error, clearError, navigate]);

	// FETCH PAGE ON LOAD
	useEffect(() => {
		if (pageId) fetchPage(parseInt(pageId), navigate);
	}, [pageId, fetchPage, navigate]);

	return (
		<>
			<PageHeader page_name={page.page_name} />
			<div className="cell-list">
				{page.error && <div className="error-messages">{page.error}</div>}
				{renderedCells}
				{(showCodeButton || showTextButton) && (
					<AddCell
						showCodeButton={showCodeButton}
						showTextButton={showTextButton}
					/>
				)}
			</div>
		</>
	);
};

export default Page;
