export const UPDATE = "UPDATE_UI";

export function updateUI(field, value) {
	return {
		type: UPDATE,
		payload: { field, value }
	}
}