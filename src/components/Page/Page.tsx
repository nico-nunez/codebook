import './Page.css';
import { Fragment } from 'react';
import AddCell from '../Add-Cell/Add-Cell';
import CellItem from '../Cell/Cell';
import PageHeader from './PageHeader';
import { useTypedSelector } from '../../hooks';

const Page: React.FC = () => {
	const page = useTypedSelector(({ page }) => page);
	const order = useTypedSelector(({ cells: { order } }) => order);
	let showCodeButton = true;
	let showTextButton = true;
	const renderedCells = order.map(({ id, type }) => {
		if (type === 'code') showCodeButton = false;
		if (type === 'text') showTextButton = false;
		return (
			<Fragment key={id}>
				<CellItem id={id} type={type} />
			</Fragment>
		);
	});
	return (
		<>
			<PageHeader pageName={page.name} />
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
