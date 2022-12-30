import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/loginPage/loginPage';
import ErrorPage from './pages/errorPage/errorPage';

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</div>
	);
}

export default App;
