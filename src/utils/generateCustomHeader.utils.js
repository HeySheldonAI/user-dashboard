import encrypt from '../helpers/encrypt.helpers';

// This function generates a custom header for the API calls
// The header is encrypted using AES-256 encryption
// The header is a string of the following format:
// origin::timestamp::randomString
const generateCustomHeader = () => {
	const origin = 'sheldon_user_dashboard';
	const timestamp = new Date().getTime();
	const randomString =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);

	const headerString = `${origin}::${timestamp}::${randomString}`;
	return encrypt(headerString);
};

export default generateCustomHeader;
