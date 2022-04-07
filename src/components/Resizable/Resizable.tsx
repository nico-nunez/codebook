import './resizable.css';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
  direction: 'horiztonal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={500} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
