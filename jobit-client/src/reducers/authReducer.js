import {
    UPDATE_LOGIN, UPDATE_PRINCIPAL,
    INIT
} from "../actions/authActions.js";

export const initState = {
    login: {
        form: {
            id: "",
            password: ""
        },
        msg: {
            id: "",
            password: ""
        }
    },
    principal: null
};

export default function reducer(state = { ...initState }, action) {
    const payload = action.payload;

    switch (action.type) {
        case INIT: {
            return payload
        }
        case UPDATE_LOGIN: {
            return {
                ...state,
                login: payload
            };
        }
        case UPDATE_PRINCIPAL: {
            return {
                ...state,
                principal: payload
            };
        }
        default:
            return state;
    }
}
