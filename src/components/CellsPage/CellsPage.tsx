import './CellsPage.css';
import { Fragment, useState } from 'react';
import AddCell from '../Add-Cell/Add-Cell';
import Cell from '../Cell/Cell';
import PageHeader from './CellsPageHeader';
import { useTypedSelector } from '../../hooks';

const CellsPage: React.FC = () => {
	const cells = useTypedSelector(({ cells }) => cells);
	let showCodeButton = true;
	let showTextButton = true;
	const renderedCells = cells.order.map(({ id, type }) => {
		if (type === 'code') showCodeButton = false;
		if (type === 'text') showTextButton = false;
		return (
			<Fragment key={id}>
				<Cell cell={cells[type][id]} />
			</Fragment>
		);
	});
	return (
		<>
			<PageHeader />
			<div className="cell-list">
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

export default CellsPage;
