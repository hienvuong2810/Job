import { node } from '../config.json';

export const UPDATE_LOGIN = "AUTH_UPDATE_LOGIN";
export const UPDATE_PRINCIPAL = "AUTH_UPDATE_PRINCIPAL";
export const INIT = "AUTH_INIT";

export function init(state) {
    return {
        type: INIT,
        payload: state
    }
}

export function updateLogin(login) {
	return {
		type: UPDATE_LOGIN,
		payload: login
	}
}

export function checkSession() {
    return async function(dispatch) {
        if (!getCookie("jbit-stkn"))
            return null;

        let res = await fetch(node + "/api/auth", {
            method: "PUT",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "x-auth-token": getCookie("jbit-stkn")
            }
        });

        let principal = null;
        
        if (res.status === 200) {
            res = await res.json();
            setCookie("jbit-stkn", res.token, 1);
            principal = { ...res };
        }

        dispatch({
            type: UPDATE_PRINCIPAL,
            payload: principal
        });

        return res.status;
    };
}

export function authorize(form) {
    return async function(dispatch) {

        let res = await fetch(node + "/api/auth", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                username: form.id,
                password: form.password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        delete form.password;

        if (!res)
            return null;

        if (res.status === 200) {
            res = await res.json();
            setCookie("jbit-stkn", res.token, 1);
            setCookie("username",form.id,null);

            dispatch({
                type: UPDATE_PRINCIPAL,
                payload: { ...res }
            });

            return 200;
        }

        return res.status;
    };
}

function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        let date = new Date();

        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === " ") c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
}
