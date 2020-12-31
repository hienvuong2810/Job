import {
	UPDATE_AUTHORITY, UPDATE_GENDER, UPDATE_CITY, UPDATE_COUNTRY,
	UPDATE_PHONECODE, INIT, GET_FACTORS, UPDATE_FACTORS, CREATE_FACTORS
} from '../actions/factorsActions.js';

export const initState = {
	authority: {
		list: [{ id: "bfGahs", name: "READ", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "heJths", name: "WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "Sadeas", name: "READ-WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" }],
		form: {
			id: "auto-generated", name: "", createdBy: "hongloc", createdOn: "2019-12-02"
		},
		action: "create",
		loading: false
	},

	gender: {
		list: [ { id: "bfGahs", name: "READ", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "heJths", name: "WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "Sadeas", name: "READ-WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" }
		],
		form: {
			id: "auto-generated",
			name: ""
		},
		loading: false,
		action: 'create'
	},

	role: {
		list: [ { id: "bfGahs", name: "READ", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "heJths", name: "WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" },
			{ id: "Sadeas", name: "READ-WRITE", createdBy: "ngochuyou", createdOn: "Nov 10 2019" }
		],
		form: {
			id: "auto-generated", name: "", createdBy: "", createdOn: ""
		},
		action: "create",
		loading: false
	},
	city: {
		list: []
	},
	country: {
		list: []
	},
	phoneCode: {
		list: []
	}
}

export default function reducer(state = { ...initState }, action) {
	const payload = action.payload;
	const choices = [
		{
			id: "authority",
			url: "http://localhost:8080/api/update/authority"
		},
		{
			id: 'gender',
			url: 'http://localhost:8080/api/update/gender'
		},
		{
			id: 'role',
			url: 'http://localhost:8080/api/update/role'
		}
	];
	switch(action.type) {
		case UPDATE_FACTORS: {
			console.log(payload.field);
			if (payload.field === "authority") {
				choices.map(ele => function() {
					if (ele.id === payload.field && payload.value.action === "create") {
						// console.log("Send update!" + ", " + ele.url);
						// console.log(payload.value.newElement.id + ", name: " + payload.value.newElement.name);
					}
				})
			}
			if (payload.field === 'gender') {
				choices.map(ele => function() {
					if (ele.id === payload.field && payload.value.action === "create") {
						// console.log("Send update!" + ", " + ele.url);
						// console.log(payload.value.newElement.id + ", name: " + payload.value.newElement.name);
					}
				})
			}
			if (payload.field === 'role') {
				choices.map(ele => function() {
					if (ele.id === payload.field && payload.value.action === "create") {
						// console.log("Send update!" + ", " + ele.url);
						// console.log(payload.value.newElement.id + ", name: " + payload.value.newElement.name);
					}
				})
			}
			return {
				...state,
				[payload.field]: payload.value
			}
		}


		case GET_FACTORS: {
			switch(action.ele) {

				case 'role': {
					return {
						...state,
						role: {
							...state.role,
							list: action.payload
						}
					}
				}
				case 'gender': {
					return {
						...state,
						gender: {
							...state.gender,
							list: action.payload
						}
					}
				}
				case 'authority': {
					return {
						...state,
						authority: {
							...state.authority,
							list: action.payload
						}
					}
				}
				default: return state;
			}
		}

		case CREATE_FACTORS: {
			switch (action.ele) {
				case 'authority':
					return {
						...state,
						authority: {
							...state.authority,
							list: action.payload
						}
					}

				default: return state;
			}
		}

		case INIT: {
			return payload;
		}

		case UPDATE_AUTHORITY: {
			return {
				...state,
				authority: {
					...state.authority,
					[payload.field]: payload.value
				}
			}
		}
		case UPDATE_GENDER: {
			return {
				...state,
				gender: {
					...state.gender,
					[payload.field]: payload.value
				}
			}
		}
		case UPDATE_COUNTRY: {
			return {
				...state,
				country: {
					...state.country,
					[payload.field]: payload.value
				}
			}
		}
		case UPDATE_CITY: {
			return {
				...state,
				city: {
					...state.city,
					[payload.field]: payload.value
				}
			}
		}
		case UPDATE_PHONECODE: {
			return {
				...state,
				phoneCode: {
					...state.city,
					[payload.field]: payload.value
				}
			}
		}

		default: return state;
	}
}
