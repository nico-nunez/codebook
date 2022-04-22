import { useTypedSelector } from './use-type-selector';

export const useCumulativeCode = () => {
	return useTypedSelector((state) => {
		const cellsOrder = state.cells.order;
		const tabsOder: string[] = [];
		const cumulative: string[] = [];
		for (const cell of cellsOrder) {
			const tabs = state.tabs.order[cell.id];
			for (const id of tabs) {
				cumulative.push(state.tabs.data[id].content);
			}
		}
		// Undecided about inclusion...
		// const showOp = `
		//   import _React from 'react';
		//   import _ReactDOM from 'react-dom';

		//   const root = document.querySelector('#root');
		//   show = (value) => {
		//     if (typeof(value) === 'object') {
		//       if (value.$$typeof && value.props) {
		//         _ReactDOM.render(value, root);
		//         return;
		//       }
		//       root.innerHTML = JSON.stringify(value);
		//       return;
		//     }
		//     root.innerHTML = value;
		//   };
		// `;
		// const cumulative: string[] = [showOp];
		return cumulative;
	}).join('\n');
};
