import {
	UPDATE
} from '../actions/UIActions.js';

const initState = {
	navbar: {
		keyword: ""
	},
	sidebar: {
		active: false
	},
	signUpPage: {
		navOn: true,
		headerStyle: null
	}
}

export default function reducer(state = { ...initState }, action) {
	const payload = action.payload;

	switch(action.type) {
		case UPDATE : {
			return {
				...state,
				[payload.field] : payload.value
			}
		}
		default: return state;
	}
}