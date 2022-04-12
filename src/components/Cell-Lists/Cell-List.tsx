import CellListItem from './Cell-List-Item';
import { useTypedSelector } from '../../hooks/use-type-selector';

const CellList: React.FC = () => {
  const renderedCells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => <CellListItem key={id} cell={data[id]} />);
  });
  return <div>{renderedCells}</div>;
};

export default CellList;
