import {
    UPDATE_SIGNUP_FORM,
    UPDATE_SIGNUP,
    FETCH_USER,
    EVICT_USER,
    GET_ACCOUNTS,
    CHANGE_ACCOUNT_TYPE,
    CHANGE_ACCOUNT_ACTIVE,
    REFRESH_ACCOUNT_ACTIVE
} from "../actions/accountActions.js";

export const initState = {
    accounts: [],
    active: {
        admin: "",
        candidate: "",
        recruiter: ""
    },
    type: null,
    user: null,
    signUp: {
        form: {
            basicAccount: {
                username: "",
                email: "",
                phone: "",
                password: "",
                rePassword: "",
                fullname: "",
                gender: {},
                addresses: {
                    bis: "",
                    street: "",
                    city: { country: {} }
                },
                countryPhoneCode: {}
            },
            advancedAccount: {
                githubLink: "",
                facebookLink: "",
                twitterLink: "",
                linkedinLink: "",
                stackoverflowLink: "",
                webLink: "",
                otherLinks: []
            },
            candidateAccount: {
                title: "",
                resume: "",
                avatar: "",
                dob: "",
                isOpen: true
            },
            recruiterAccount: {
                contactName: "",
                contactPhonenumber: ""
            }
        },
        msg: {}
    }
};

export default function reducer(state = { ...initState }, action) {
    const payload = action.payload;

    switch (action.type) {
        case GET_ACCOUNTS: {
            return {
                ...state,
                accounts: payload
            };
        }

        case CHANGE_ACCOUNT_TYPE: {
            return {
                ...state,
                type: payload
            };
        }

        case CHANGE_ACCOUNT_ACTIVE: {
            let active = { ...state.active };
            for (let temp in active) {
                if (temp === payload) {
                    active[temp] = "btn-act-active";
                } else {
                    active[temp] = "";
                }
            }

            return {
                ...state,
                active: active
            };
        }

        case REFRESH_ACCOUNT_ACTIVE: {
            return {
                ...state,
                active: {
                    admin: "",
                    candidate: "",
                    recruiter: ""
                }
            };
        }

        case EVICT_USER: {
            return {
                ...state,
                user: null
            };
        }
        case FETCH_USER: {
            return {
                ...state,
                user: payload
            };
        }
        case UPDATE_SIGNUP_FORM: {
            return {
                ...state,
                signUp: {
                    ...state.signUp,
                    form: {
                        ...state.signUp.form,
                        [payload.field]: payload.value
                    }
                }
            };
        }
        case UPDATE_SIGNUP: {
            return {
                ...state,
                signUp: {
                    ...state.signUp,
                    [payload.field]: payload.value
                }
            };
        }
        default:
            return state;
    }
}
