// function to check if the chrome extsion is installed or not
import constants from '../utils/constants';

// function to check if the chrome extsion is installed or not
const checkExtension = (callback) => {
	try {
		window.chrome.runtime.sendMessage(
			constants.CHROME_EXTENSION_ID,
			{ action: 'sheldon_connect' },
			(response) => {
				if (
					response &&
					response.responseType &&
					response.responseUniqueCode &&
					response.responseType === 'success' &&
					response.responseUniqueCode === 'sheldon_connection_success'
				) {
					return callback({
						responseType: 'success',
						responseMessage: 'Extension installed and enabled.',
						responseUniqueCode: 'sheldon_connection_success',
						responsePayload: null,
					});
				}

				return callback({
					responseType: 'error',
					responseMessage:
						'Extension not installed or not enabled. If the error persists, please contact the developer.',
					responseUniqueCode: 'sheldon_connection_error',
					responsePayload: null,
				});
			}
		);
	} catch (err) {
		return callback({
			responseType: 'error',
			responseMessage:
				'Extension not installed or not enabled. If the error persists, please contact the developer.',
			responseUniqueCode: 'sheldon_connection_error',
			responsePayload: null,
		});
	}
};

export default checkExtension;
