import { useActions } from '../../../hooks';
import Form from '../../Forms/Form';
import FormField from '../../Forms/FormField';

interface LoginInputs {
	email: string;
	password: string;
}

const Login = () => {
	const { loginUser } = useActions();
	const onSubmitForm = (inputs: {}) => {
		loginUser({ ...(inputs as LoginInputs) });
	};
	return (
		<>
			<Form
				name="login"
				id="login"
				onSubmit={onSubmitForm}
				validationOptions={{ password: false }}
			>
				<FormField type="email" placeholder="Email" name="email" required />
				<FormField
					type="password"
					placeholder="Password"
					name="password"
					required
				/>
			</Form>
		</>
	);
};

export default Login;
