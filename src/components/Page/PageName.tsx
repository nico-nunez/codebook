import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks';

interface PageNameProps {
	name: string;
}

export const PageName: React.FC<PageNameProps> = ({ name }) => {
	const nameRef = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updatePageName } = useActions();

	useEffect(() => {
		const handleClick = (evt: MouseEvent) => {
			if (
				nameRef.current &&
				evt.target &&
				nameRef.current.contains(evt.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener('click', handleClick, { capture: true });
		return () => {
			document.removeEventListener('click', handleClick, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<span ref={nameRef}>
				<input
					className="input is-medium has-text-centered"
					value={name}
					onChange={(e) => updatePageName(e.target.value)}
				/>
			</span>
		);
	}
	return (
		<div className="page-name">
			<span className="is-size-4 ml-6">{name}</span>
			<i
				className={`fa-solid fa-${editing ? 'check' : 'pencil'}`}
				onClick={() => setEditing(true)}
			></i>
		</div>
	);
};

export default PageName;
