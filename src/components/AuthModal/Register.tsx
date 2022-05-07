import { useActions } from '../../hooks';
import Form from '../Forms/Form';
import FormField from '../Forms/FormField';

interface RegisterInputs {
	email: string;
	password: string;
	confirmPass: string;
	profile_name: string;
}

const Register = () => {
	const { registerUser } = useActions();
	const onSubmitForm = (inputs: {}) => {
		registerUser({ ...(inputs as RegisterInputs) });
	};
	return (
		<>
			<Form onSubmit={onSubmitForm} name="register" id="register">
				<FormField type="email" placeholder="Email" name="email" required />
				<FormField
					type="text"
					placeholder="Profile Name"
					name="profile_name"
					required
				/>
				<FormField
					type="password"
					placeholder="Password"
					name="password"
					required
				/>
				<FormField
					type="password"
					placeholder="Confirm Password"
					name="confirmPass"
					required
				/>
			</Form>
		</>
	);
};

export default Register;
