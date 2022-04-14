import { createPortal } from 'react-dom';

interface ModalProps {
	active: boolean;
	onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ active, onClick }) => {
	const modalRoot = document.querySelector('#modal');
	if (modalRoot) {
		return createPortal(
			<div className={`modal ${active && 'is-active'}`}>
				<div className="modal-background" onClick={onClick}></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">We're working on it :)</p>
						<button
							className="delete"
							aria-label="close"
							onClick={onClick}
						></button>
					</header>
					<section className="modal-card-body">
						<p>Unfortunately this feature isn't quite ready.</p>
						<p> Please check back soon!</p>
					</section>
					<footer className="modal-card-foot">
						{/* <button className="button is-success">Save changes</button> */}
						<button onClick={onClick} className="button">
							Cancel
						</button>
					</footer>
				</div>
			</div>,
			modalRoot
		);
	}
	return null;
};

export default Modal;
