import { useTypedSelector } from './use-type-selector';

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state) => {
		const { data, order } = state.cells;
		const showOp = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      const root = document.querySelector('#root');
      show = (value) => {
        if (typeof(value) === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
            return;
          }
          root.innerHTML = JSON.stringify(value);
          return;
        }
        root.innerHTML = value;
      };
    `;
		const showNoop = 'show = () => {};';
		const cumulative: string[] = ['let show;'];
		for (const id of order) {
			if (data[id].type === 'code') {
				const showFunc = id === cellId ? showOp : showNoop;
				cumulative.push(showFunc);
				cumulative.push(data[id].content);
			}
			if (id === cellId) break;
		}
		return cumulative;
	}).join('\n');
};
