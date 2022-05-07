import React from 'react';
import { createPortal } from 'react-dom';
import { useActions, useTypedSelector } from '../../hooks';

type HeaderProps = { title: string };

// export const ModalHeader: React.FC<HeaderProps> = ({ title }) => {
// 	return (
// 		<header className="modal-card-head">
// 			<div className="modal-card-title">{title}</div>
// 			<button className="delete" aria-label="close" onClick={onClick}></button>
// 		</header>
// 	);
// };

export const ModalBody: React.FC = ({ children }) => {
	return <section className="modal-card-body">{children}</section>;
};

export const ModalFooter: React.FC = ({ children }) => {
	return <footer className="modal-card-foot">{children}</footer>;
};

interface ModalProps {
	name: string;
	title: string;
	content?: string;
	confirmBtn?: boolean;
	onConfirm?: () => void;
	cancelBtn?: boolean;
	onCancel?: () => {};
}

const Modal: React.FC<ModalProps> = ({
	name,
	title,
	content,
	confirmBtn = true,
	onConfirm,
	cancelBtn = true,
	onCancel,
	children,
}) => {
	const { display, modalName } = useTypedSelector(({ modal }) => modal);
	const { hideModal } = useActions();
	const modalRoot = document.querySelector('#modal');
	const isActive = display && modalName === name;
	const onClick = () => {
		hideModal();
	};
	const renderFooter = () => {
		if (!confirmBtn && !cancelBtn) return;
		return (
			<footer
				className="modal-card-foot"
				style={{ display: 'flex', justifyContent: 'end' }}
			>
				{confirmBtn && (
					<button onClick={onConfirm} className="button cancel">
						Confirm
					</button>
				)}
				{cancelBtn && (
					<button onClick={onCancel || onClick} className="button cancel">
						Cancel
					</button>
				)}
			</footer>
		);
	};
	if (modalRoot) {
		return createPortal(
			<div className={`modal ${isActive && 'is-active'}`}>
				<div className="modal-background" onClick={onClick}></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p
							className="modal-card-title "
							style={{ width: '90%', textAlign: 'center' }}
						>
							{title}
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={onClick}
						></button>
					</header>
					{content && <section className="modal-card-body">{content}</section>}
					{children}
					{renderFooter()}
				</div>
			</div>,
			modalRoot
		);
	}
	return null;
};

export default Modal;
