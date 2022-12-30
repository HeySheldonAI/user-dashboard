import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../config/firebaseConfig';
import { loginUser } from '../apis/auth';

const handleGoogleLogin = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		const { user } = result;

		if (!user || !user.displayName || !user.email) {
			return {
				responseType: 'error',
				responseUniqueCode: 'login_error',
				responsePayload: null,
				responseMessage: 'Error logging in. Please contact the team.',
			};
		}

		const { displayName, email } = user;

		const backendResponse = await loginUser({ displayName, email });
		// no need to check if error or success because in either case, we have to return the response for the caller function to check.

		return backendResponse;
	} catch (error) {
		return {
			responseType: 'error',
			responseUniqueCode: 'login_error',
			responsePayload: null,
			responseMessage: 'Error logging in. Please contact the team.',
		};
	}
};

export default handleGoogleLogin;
