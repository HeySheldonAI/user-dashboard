import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { analytics } from './config/firebaseConfig';

// keep the css of the page above the components so that component styles can override the page styles
import './index.css';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
