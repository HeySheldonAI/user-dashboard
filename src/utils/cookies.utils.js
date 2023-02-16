import Cookies from 'universal-cookie';

const cookies = new Cookies();

const setCookie = (key, value) => {
	cookies.set(key, value, {
		path: '/',
		expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
		secure: true, // set to true if your using https
	});
};

const getCookie = (key) => {
	return cookies.get(key);
};

const removeCookie = (key) => {
	cookies.remove(key);
};

export { setCookie, getCookie, removeCookie };
