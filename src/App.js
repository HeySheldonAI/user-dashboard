import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './config/firebaseConfig';

function App() {
	const handleLogin = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				const { email, displayName } = user;
				console.log(email, displayName);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="App">
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}

export default App;
