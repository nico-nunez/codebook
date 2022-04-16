import './Page.css';
import { Fragment } from 'react';
import AddCell from '../Add-Cell/Add-Cell';
import Cell from '../Cell/Cell';
import PageHeader from './Page-Header';
import { useTypedSelector } from '../../hooks';

const Page = () => {
	const renderedCells = useTypedSelector(({ page: { order, data } }) => {
		return order.map((id, i) => {
			return (
				<Fragment key={id}>
					<Cell cell={data[id]} />
				</Fragment>
			);
		});
	});

	return (
		<>
			<PageHeader />
			<div className="cell-list">
				{renderedCells}
				{renderedCells.length <= 1 && <AddCell nextCellId={null} />}
			</div>
		</>
	);
};

export default Page;
