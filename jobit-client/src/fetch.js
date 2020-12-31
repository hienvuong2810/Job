import { proxy as proxyURL } from './config.json';
import { getCookie } from './actions/authActions.js';

export async function proxy(url, options) {
	return await fetch(proxyURL + "?url=" + escape(url), {
		...options,
		headers: {
			...options.headers,
			"x-auth-token" : getCookie("jbit-stkn")
		}
	})
	.then(res => res, err => console.log(err));
}