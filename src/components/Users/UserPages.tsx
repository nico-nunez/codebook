// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useTypedSelector } from '../../hooks';
import PageCard from '../PageCard/PageCard';

const UsersPages = () => {
	// const { userId } = useParams();
	// const navigate = useNavigate();
	// const auth = useTypedSelector(({ auth }) => auth);

	// useEffect(() => {

	// },[userId, auth, navigate]);

	return (
		<div className="columns">
			<div className="column is-three-quarters m-auto mt-6">
				<h1 className="is-size-3 has-text-centered">My Pages</h1>
				<div className="columns">
					<div className="column is-one-third">
						<PageCard />
					</div>
					<div className="column is-one-third">
						<PageCard />
					</div>
					<div className="column is-one-third">
						<PageCard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersPages;
