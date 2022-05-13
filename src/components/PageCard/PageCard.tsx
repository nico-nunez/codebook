import { Link } from 'react-router-dom';
import { SavedPage } from '../../state';

interface PageCardProps {
	page?: SavedPage;
}

const PageCard: React.FC<PageCardProps> = ({ page }) => {
	return (
		<div className="card">
			<div className="card-content">
				<div className="content">
					<p className="title is-4">{page?.page_name || 'Page_Name'}</p>
					<p className="subtitle is-6">Author: {'Profile Name'}</p>
					<time dateTime="2016-1-1" className="is-block">
						Created: {page?.created_at || new Date().toLocaleDateString()}
					</time>
					<time dateTime="2016-1-1" className="is-block">
						Updated: {page?.updated_at || new Date().toLocaleDateString()}
					</time>
				</div>
			</div>
			<footer className="card-footer">
				<Link to={`/pages/${page?.id}`} className="card-footer-item">
					View
				</Link>
				<a
					href="#"
					className="card-footer-item"
					style={{ backgroundColor: '#d64742aa' }}
				>
					Delete
				</a>
			</footer>
		</div>
	);
};

export default PageCard;
