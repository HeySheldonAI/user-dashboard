import { removeCookie } from '../utils/cookies.js';

const handleLogout = () => {
	removeCookie('token');
	removeCookie('isUserNew');

	return {
		responseType: 'success',
		responseMessage: 'You have been logged out successfully.',
		responseUniqueCode: 'logout_success',
		responsePayload: null,
	};
};

export default handleLogout;
