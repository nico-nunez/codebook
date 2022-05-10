import './Page.css';
import { Fragment } from 'react';
import AddCell from '../Add-Cell/Add-Cell';
import CellItem from '../Cell/Cell';
import PageHeader from '../PageHeader/PageHeader';
import { useTypedSelector } from '../../hooks';

const Page: React.FC = () => {
	const page = useTypedSelector(({ page }) => page);
	const cells = useTypedSelector(({ cells }) => cells);
	let showCodeButton = true;
	let showTextButton = true;
	const renderedCells = cells.order.map((cell_id) => {
		const { cell_type } = cells.data[cell_id];
		if (cell_type === 'code') showCodeButton = false;
		if (cell_type === 'text') showTextButton = false;
		return (
			<Fragment key={cell_id}>
				<CellItem id={cell_id} />
			</Fragment>
		);
	});
	return (
		<>
			<PageHeader page_name={page.page_name} />
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

export default Page;
