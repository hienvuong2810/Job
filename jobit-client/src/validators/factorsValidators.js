// import { proxy } from '../fetch.js';

export async function validateAuthority(auth) {
	let msg = { id: "", name: "" };

	if (!auth) return false;

	if (!auth.id || !auth.name) {
		msg.id = "ID and Name cannot be null.";
		msg.name = "ID and Name cannot be null.";

		return { ok: false, msg };
	}

	if (auth.id.length < 3) {
		msg.id = "ID is too short.";

		return { ok: false, msg };
	}

	if (auth.name.length === 0) {
		msg.id = "Name cannot be empty.";

		return { ok: false, msg };
	}

	return { ok: true, msg };
}

export async function validateRole(role) {
	let msg = { id: "", name: "" };

	if (!role) return false;

	if (!role.id || !role.name) {
		msg.id = "ID and Name cannot be null.";
		msg.name = "ID and Name cannot be null.";

		return { ok: false, msg };
	}

	if (role.id.length < 3) {
		msg.id = "ID is too short.";

		return { ok: false, msg };
	}

	if (role.name.length === 0) {
		msg.id = "Name cannot be empty.";

		return { ok: false, msg };
	}

	return { ok: true, msg };
}

export async function validateGender(gender) {
	let msg = { id: "", name: "" };

	if (!gender) return false;

	if (!gender.id || !gender.name) {
		msg.id = "ID and Name cannot be null.";
		msg.name = "ID and Name cannot be null.";

		return { ok: false, msg };
	}

	if (gender.id.length < 8) {
		msg.id = "ID is too short.";

		return { ok: false, msg };
	}

	if (gender.id.length > 10) {
		msg.id = "ID is too long.";

		return { ok: false, msg };
	}

	if (gender.name.length === 0) {
		msg.id = "Name cannot be empty.";

		return { ok: false, msg };
	}

	return { ok: true, msg };
}
