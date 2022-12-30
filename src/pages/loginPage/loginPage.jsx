import { useEffect, useState } from 'react';

import './loginPage.css';
import MainLogo from '../../assets/images/mainLogo.webp';
import GoogleLogo from '../../assets/images/googleLogo.svg';
import LogoutIcon from '../../assets/images/logout.svg';

import { getCookie, removeCookie, setCookie } from '../../helpers/cookies';
import { getLoggedInUser } from '../../apis/auth';
import checkExtension from '../../helpers/checkExtension';
import constants from '../../helpers/constants';
import handleGoogleLogin from '../../helpers/handleGoogleLogin';
import handleLogout from '../../helpers/handleLogout';

// flow:
// Loading is set to true
// Cookie is checked.
// if present, send it to the backend to verify the token.
// if valid, set the user to loggedin and set loading to false.
// if invalid, remove the cookie, set the user to loggedout and set loading to false.
// if cookie not present
// set the user to loggedout and set loading to false.

// If user is not loggedin,
// show the login button.
// on click of the login button, check if the extension exists.
// If extension doesn't exist, show the popup to install the extension and redirect.
// If extension exists,
// start loading, send the request to the backend to login the user.
// if the user is loggedin successfully, set cookie, set the user to loggedin and set loading to false.
// if the user is not loggedin successfully, set the user to loggedout and set loading to false.

// If user is loggedin,
// show the logout button.
// on click of the logout button, start loading, remove the cookie, set the user to loggedout and set loading to false.

const LoginPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const callLogin = () => {
		setIsLoading(true);
		const callback = (extensionResponse) => {
			if (extensionResponse.responseType === 'error') {
				setIsLoading(false);
				alert(extensionResponse.responseMessage);
				window.location.href = constants.CHROME_EXTENSION_URL;
				return;
			}

			const login = async () => {
				const loginResponse = await handleGoogleLogin();
				if (loginResponse.responseType === 'error') {
					setIsLoading(false);
					alert(loginResponse.responseMessage);
					return;
				}

				const { token, isUserNew } = loginResponse.responsePayload;
				setCookie('token', token);
				setCookie('isUserNew', isUserNew);
				setIsLoggedIn(true);
				setIsLoading(false);
				return;
			};

			return login();
		};

		return checkExtension(callback);
	};

	const callLogout = () => {
		setIsLoading(true);
		handleLogout();
		setIsLoggedIn(false);
		setIsLoading(false);
	};

	useEffect(() => {
		const cookie = getCookie('token');
		if (!cookie || typeof cookie !== 'string' || !cookie.trim()) {
			removeCookie('token');
			removeCookie('isUserNew');
			setIsLoggedIn(false);
			setIsLoading(false);
			return;
		}

		const verifyToken = async () => {
			const backendResponse = await getLoggedInUser({ token: cookie });
			if (backendResponse.responseType === 'error') {
				removeCookie('token');
				removeCookie('isUserNew');
				setIsLoggedIn(false);
				setIsLoading(false);
				alert(backendResponse.responseMessage);
				return;
			}

			setIsLoggedIn(true);
			setIsLoading(false);
		};

		verifyToken();
	}, []);

	return (
		<main className="login_page">
			<section className="page__login_container">
				<img
					src={MainLogo}
					alt="Sheldon Logo"
					className="login_container__logo"
					title="Sheldon Logo"
				/>
				<h1 className="login_container__heading">Welcome to Sheldon</h1>
				{isLoading ? (
					<button className="login_container__button--disabled" disabled>
						<span className="button__text">Loading ....</span>
					</button>
				) : isLoggedIn ? (
					<button className="login_container__button" onClick={callLogout}>
						<img
							src={LogoutIcon}
							alt="Logout Icon"
							className="button__image"
							title="Logout"
						/>
						<span className="button__text">Logout</span>
					</button>
				) : (
					<button className="login_container__button" onClick={callLogin}>
						<img
							src={GoogleLogo}
							alt="Google Logo"
							className="button__image"
							title="Login with Google"
						/>
						<span className="button__text">Login with Google</span>
					</button>
				)}
				<p className="login__disclaimer">
					{isLoggedIn ? 'You are agreeing' : 'By continuing, you agree'} to our{' '}
					<a
						href="https://heysheldon.com/assets/docs/privacypolicy.txt"
						target="_blank"
						rel="noreferrer"
						className="disclaimer__link"
					>
						Privacy Policy
					</a>
					{', '}
					<a
						href="https://heysheldon.com/assets/docs/termsofservice.txt"
						target="_blank"
						rel="noreferrer"
						className="disclaimer__link"
					>
						Terms of Service
					</a>
					{', '}
					<a
						href="https://heysheldon.com/assets/docs/contentpolicy.txt"
						target="_blank"
						rel="noreferrer"
						className="disclaimer__link"
					>
						Content Policy
					</a>
					{', '}
					and{' '}
					<a
						href="https://heysheldon.com/assets/docs/cookiepolicy.txt"
						target="_blank"
						rel="noreferrer"
						className="disclaimer__link"
					>
						Cookie Policy
					</a>
					.
				</p>
			</section>
		</main>
	);
};

export default LoginPage;
