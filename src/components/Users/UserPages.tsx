import { useTypedSelector } from '../../hooks';

const UsersPages = () => {
	const auth = useTypedSelector(({ auth }) => auth);
	return (
		<div className="columns">
			<div className="column is-half m-auto mt-6">
				<h1 className="is-size-3 has-text-centered">User's Pages</h1>
			</div>
		</div>
	);
};

export default UsersPages;
