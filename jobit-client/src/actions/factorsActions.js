import { proxy } from "../fetch.js";
import { backend } from "../config.json";

export const INIT = "FTS_INIT";
export const UPDATE_AUTHORITY = "FTS_UPDATE_AUTH";
export const UPDATE_GENDER = "FTS_UPDATE_GEND";
export const UPDATE_COUNTRY = "FTS_UPDATE_COUNTRY";
export const UPDATE_CITY = "FTS_UPDATE_CITY";
export const UPDATE_PHONECODE = "FTS_UPDATE_PHONECODE";

export function init(state) {
    return {
        type: INIT,
        payload: state
    };
}

export const GET_FACTORS = "FTS_GET_FACTORS";
export const UPDATE_FACTORS = "FTS_UPDATE_FACTORS";
export const CREATE_FACTORS = "FTS_CREATE_FACTORS";

export const getFactors = ele => {
    return async function(dispatch) {
        console.log(ele);
        let res = await proxy("http://localhost:8080/api/factor/" + ele, {
            method: "GET",
            headers: {
                // 'Authorization': "Bearer " + token.access_token,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        // console.log(await res.json());
        if (res.ok) {
            let data = await res.json();
            dispatch({
                type: GET_FACTORS,
                payload: data,
                ele: ele
            });
        }
    };
};

export function updateFactors(field, value) {
    if (value.action === "create")
        return async function(dispatch) {
            let res = await proxy("http://localhost:8080/api/update/" + field, {
                method: "PUT",
                headers: {
                    // 'Authorization': "Bearer " + token.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: value.newElement.id,
                    name: value.newElement.name,
                    createdBy: value.newElement.createdBy,
                    createdOn: value.newElement.createdOn
                })
            });
            // console.log(await res.json());
            if (res.ok) {
                res = await res.json();
                console.log(res);
                dispatch({
                    type: UPDATE_FACTORS,
                    payload: {
                        field,
                        value
                    }
                });
            }
        };
    console.log(value.action);
    return {
        type: UPDATE_FACTORS,
        payload: {
            field,
            value
        }
    };
}

export function updateAuthority(field, value) {
    return {
        type: UPDATE_AUTHORITY,
        payload: {
            field,
            value
        }
    };
}

export const createFactors = (field, value) => {
    return async function(dispatch) {
        let res = await proxy("http://localhost:8080/api/create/" + field, {
            method: "POST",
            headers: {
                // 'Authorization': "Bearer " + token.access_token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: value.newElement.name,
                createdBy: value.newElement.createdBy,
                createdOn: value.newElement.createdOn
            })
        });
        // console.log(await res.json());
        if (res.ok) {
            res = await res.json();
            console.log(res);
        }
    };
};

export function fetchAuthorities() {
    return async function(dispatch) {
        await proxy(backend + "/api/factors/authority", {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json"
            }
        });
    };
}

export function fetchFactors() {
    return async function(dispatch) {
        let result = await fetchGenderList();
        let list;

        if (result.ok) {
            list = await result.json();
            dispatch({
                type: UPDATE_GENDER,
                payload: {
                    field: "list",
                    value: Array.isArray(list) ? list : []
                }
            });
        }

        result = await fetchPhonecodeList();

        if (result.ok) {
            list = await result.json();
            dispatch({
                type: UPDATE_PHONECODE,
                payload: {
                    field: "list",
                    value: Array.isArray(list) ? list : []
                }
            });
        }

        result = await fetchCountryList();

        if (result.ok) {
            list = await result.json();

            dispatch({
                type: UPDATE_COUNTRY,
                payload: {
                    field: "list",
                    value: Array.isArray(list) ? list : []
                }
            });
        }

        if (list) {
            if (Array.isArray(list) && list.length !== 0) {
                result = await fetchCityList(list[0].id);

                if (result.ok) {
                    list = await result.json();

                    dispatch({
                        type: UPDATE_CITY,
                        payload: {
                            field: "list",
                            value: Array.isArray(list) ? list : []
                        }
                    });
                }
            }
        }
    };
}

export function fetchCities(countryId) {
    return async function(dispatch) {
        const result = await fetchCityList(countryId);
        let list;

        if (result.ok) {
            list = await result.json();

            dispatch({
                type: UPDATE_CITY,
                payload: {
                    field: "list",
                    value: Array.isArray(list) ? list : []
                }
            });
        }
    };
}

const fetchCountryList = () => {
    return fetch(backend + "/api/factor/country", {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
};

const fetchCityList = countryId => {
    return fetch(backend + "/api/factor/city/" + countryId, {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
};

const fetchGenderList = () => {
    return fetch(backend + "/api/factor/gender", {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
};

const fetchPhonecodeList = () => {
    return fetch(backend + "/api/factor/phone_code", {
        mode: "cors",
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
};
