import CellListItem from './Cell-List-Item';
import { useTypedSelector } from '../../hooks/use-type-selector';

import AddCell from '../Add-Cell/Add-Cell';
import React from 'react';

const CellList: React.FC = () => {
	const renderedCells = useTypedSelector(({ cells: { order, data } }) => {
		return order.map((id, i) => {
			return (
				<React.Fragment key={id}>
					<AddCell nextCellId={id} />
					<CellListItem cell={data[id]} />
				</React.Fragment>
			);
		});
	});
	return (
		<div>
			{renderedCells}
			<AddCell nextCellId={null} />
		</div>
	);
};

export default CellList;
