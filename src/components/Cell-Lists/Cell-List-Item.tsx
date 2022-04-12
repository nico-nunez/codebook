import TextEditor from '../Text-Editor/Text-editor';
import CodeCell from '../Code-Cell';
import { Cell } from '../../state';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      {cell.type === 'code' ? (
        <CodeCell cell={cell} />
      ) : (
        <TextEditor cell={cell} />
      )}
    </div>
  );
};

export default CellListItem;
