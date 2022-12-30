import constants from '../helpers/constants';
import generateCustomHeader from '../helpers/generateCustomHeader';

const loginUser = async (context) => {
	try {
		// google returns displayName and not fullName.
		let { email, displayName } = context;

		if (
			!displayName ||
			!email ||
			typeof email !== 'string' ||
			typeof displayName !== 'string' ||
			!displayName.trim() ||
			!email.trim()
		) {
			return {
				responseType: 'error',
				responseMessage: 'Invalid Email or Display Name.',
				responseUniqueCode: 'invalid_data',
				responsePayload: null,
			};
		}

		displayName = displayName.trim();
		email = email.trim();

		// test email
		const emailRegex = new RegExp(
			'^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
		);
		if (!emailRegex.test(email)) {
			return {
				responseType: 'error',
				responseMessage: 'Invalid Email.',
				responseUniqueCode: 'invalid_email',
				responsePayload: null,
			};
		}

		// generating custom header.
		const customHeaderData = generateCustomHeader();
		if (customHeaderData.responseType !== 'success') {
			// the encrypt function used in generateCustomHeader() can cause an error. So, we need to handle that error.
			return customHeaderData;
		}

		const customHeader = customHeaderData.responsePayload;

		const response = await fetch(constants.BACKEND_URL + '/api/v1/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-custom-header': customHeader,
			},
			body: JSON.stringify({ email, fullName: displayName }),
		});
		const fetchedData = await response.json();
		const { responseType, responsePayload } = fetchedData;
		if (responseType !== 'success') {
			// can return the error message from the backend. The message should be readable by the user.
			return fetchedData;
		}

		// validating the response payload.
		const { token, isUserNew } = responsePayload;
		if (
			!token ||
			typeof token !== 'string' ||
			!token.trim() ||
			typeof isUserNew !== 'boolean'
		) {
			return {
				responseType: 'error',
				responseMessage:
					'Login Error. Please refresh the page. If the error persists, please contact the team.',
				responseUniqueCode: 'error_logging_in',
				responsePayload: null,
			};
		}

		// returning the token and isUserNew so that the caller function can then call the cookie setter function.
		return {
			responseType: 'success',
			responseMessage: 'Logged In Successfully.',
			responseUniqueCode: 'logged_in_successfully',
			responsePayload: {
				token,
				isUserNew,
			},
		};
	} catch (error) {
		return {
			responseType: 'error',
			responseMessage:
				'Login Error. Please refresh the page. If the error persists, please contact the team.',
			responseUniqueCode: 'internal_login_error',
			responsePayload: null,
		};
	}
};

// function to check if the token in the cookie is a valid token. If not valid, then the user is logged out by the caller function.
const getLoggedInUser = async (context) => {
	try {
		const { token } = context;

		// validating the token.
		if (!token || typeof token !== 'string' || !token.trim()) {
			return {
				responseType: 'error',
				responseMessage: 'Invalid token.',
				responseUniqueCode: 'token_invalid',
				responsePayload: null,
			};
		}

		const customHeaderData = generateCustomHeader();
		// the encrypt function used in generateCustomHeader() can cause an error. So, we need to handle that error.
		if (customHeaderData.responseType !== 'success') {
			return customHeaderData;
		}

		const customHeader = customHeaderData.responsePayload;

		const fetchedResponse = await fetch(
			constants.BACKEND_URL + '/api/v1/user/get',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-custom-header': customHeader,
					authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await fetchedResponse.json();
		const { responseType } = data;

		if (responseType !== 'success') {
			return {
				responseType: 'error',
				responseMessage: 'Invalid token.',
				responseUniqueCode: 'token_invalid',
				responsePayload: null,
			};
		}

		// no need to send user details because we are not using them anywhere.
		return {
			responseType: 'success',
			responseMessage: 'User fetched successfully.',
			responseUniqueCode: 'user_fetched_successfully',
			responsePayload: null,
		};
	} catch (error) {
		return {
			responseType: 'error',
			responseMessage:
				'Error getting user. Please refresh the page. If the error persists, please contact the team.',
			responseUniqueCode: 'internal_error',
			responsePayload: null,
		};
	}
};

export { loginUser, getLoggedInUser };
