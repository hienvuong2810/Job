import { node, backend } from "../config.json";
import {
    validateCandidate,
    validateRecruiter
} from "../validators/accountValidators.js";
import { proxy } from "../fetch.js";

export const UPDATE_SIGNUP_FORM = "UPDATE_ACCOUNT_SIGNUP_FORM";
export const UPDATE_SIGNUP = "UPDATE_ACCOUNT_SIGNUP";
export const FETCH_USER = "FETCH_USER";
export const EVICT_USER = "EVICT_USER";
export const VISITOR = "VISITOR";
export const OWNER = "OWNER";
export const JOBSEEKER = "CANDIDATE";
export const RECRUITER = "RECRUITER";

export const GET_ACCOUNTS = "GET_ACCOUNTS";
export const CHANGE_ACCOUNT_TYPE = "CHANGE_ACCOUNT_TYPE";
export const CHANGE_ACCOUNT_ACTIVE = "CHANGE_ACCOUNT_ACTIVE";
export const REFRESH_ACCOUNT_ACTIVE = "REFRESH_ACCOUNT_ACTIVE";

export function getAccounts(type) {
    return async function(dispatch) {
        const res = await proxy(
            backend + `/api/account/search/${type}?startIndex=0%26maxResult=50`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    Accept: "application/json"
                }
            }
        );

        let data = await res.json();

        dispatch({
            type: "GET_ACCOUNTS",
            payload: data
        });
    };
}

export function changeAccountType(type) {
    return function(dispatch) {
        dispatch({
            type: "CHANGE_ACCOUNT_TYPE",
            payload: type
        });
    };
}

export function changeAccountActive(name) {
    return function(dispatch) {
        dispatch({
            type: "CHANGE_ACCOUNT_ACTIVE",
            payload: name
        });
    };
}

export function refreshAccountActive() {
    return function(dispatch) {
        dispatch({
            type: "REFRESH_ACCOUNT_ACTIVE"
        });
    };
}

export function evictUser() {
    return {
        type: EVICT_USER
    };
}

export function fetchUser(username, viewAs) {
	return async function(dispatch) {
		if (!username) 
			return;

		const res = await proxy(backend + "/api/account/" + username, {
			method: "GET",
			mode: "cors",
			headers: {
				"Accept" : "application/json",
			}
		});

		if (!res)
			return;

		if (res.ok) {
			dispatch({
				type: FETCH_USER,
				payload: {
					...(await res.json()),
					exist: true,
					private: false,
					viewAs
				}
			});

			return;
		}

		if (res.status === 404) {
			dispatch({
				type: FETCH_USER,
				payload: {
					exist: false,
					private: false
				}
			});

			return;
		}

		if (res.status === 401) {
			dispatch({
				type: FETCH_USER,
				payload: {
					exist: true,
					private: true
				}
			});

			return;
		}
	}
}

export function updateSignupForm(field, value) {
    return {
        type: UPDATE_SIGNUP_FORM,
        payload: { field, value }
    };
}

export function updateAccountSignupState(field, state) {
    return {
        type: UPDATE_SIGNUP,
        payload: {
            field,
            value: state
        }
    };
}

export function signUpCandidate(form) {
    return async function(dispatch) {
        const result = validateCandidate(form);

        dispatch({
            type: UPDATE_SIGNUP,
            payload: { field: "msg", value: result.msg }
        });

        if (!Array.isArray(form.addresses)) {
            form = {
                ...form,
                addresses: [form.addresses]
            };
        }

        if (result.flag) {
            const res = await fetch(node + "/api/account/candidate", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.status === 409) {
                dispatch({
                    type: UPDATE_SIGNUP,
                    payload: {
                        field: "msg",
                        value: {
                            username:
                                "Username or email or phone number is already taken.",
                            email:
                                "Username or email or phone number is already taken",
                            phone:
                                "Username or email or phone number is already taken"
                        }
                    }
                });
            }

            return res;
        }
    };
}

export function signUpRecruiter(form) {
    return async function(dispatch) {
        const result = validateRecruiter(form);

        dispatch({
            type: UPDATE_SIGNUP,
            payload: { field: "msg", value: result.msg }
        });

        if (!Array.isArray(form.addresses)) {
            form = {
                ...form,
                addresses: [form.addresses]
            };
        }

        if (result.flag) {
            const res = await fetch(node + "/api/account/recruiter", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.status === 409) {
                dispatch({
                    type: UPDATE_SIGNUP,
                    payload: {
                        field: "msg",
                        value: {
                            username:
                                "Username or email or phone number is already taken.",
                            email:
                                "Username or email or phone number is already taken",
                            phone:
                                "Username or email or phone number is already taken"
                        }
                    }
                });
            }

            return res;
        }
    };
}