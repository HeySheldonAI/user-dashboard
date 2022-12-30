import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// keep the css of the page above the components so that component styles can override the page styles
import './index.css';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
