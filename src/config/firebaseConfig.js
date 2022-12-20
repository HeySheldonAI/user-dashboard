// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'login.heysheldon.com',
	projectId: 'user-dashboard-sheldon',
	storageBucket: 'user-dashboard-sheldon.appspot.com',
	messagingSenderId: '544317206928',
	appId: '1:544317206928:web:41e2e6c318357ec57b4315',
	measurementId: 'G-BRK53TP3P9',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
