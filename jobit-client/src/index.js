import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { checkSession } from './actions/authActions.js';

const init = async () => {
	await store.dispatch(checkSession());

	ReactDOM.render(
		<BrowserRouter>
			<Provider store={ store }>
				<App />
			</Provider>
		</BrowserRouter>,
	document.getElementById('root'));
}

init();

serviceWorker.unregister();
