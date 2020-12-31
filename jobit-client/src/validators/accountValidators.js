function validateBasicAccount(account) {
	if (!account)
		return { flag: false, msg: { } };

	const {
		username, email, phone, password, rePassword, fullname, gender,
		countryPhoneCode, addresses
	} = account;
	let msg = { };
	let flag = true;

	if (username) {
		if (username.length < 8) {
			flag = false;
			msg = { ...msg, username: "Username too short." }
		} else {
			flag = (flag ? true : false);
			msg = { ...msg, username: "" }
		}
	} else {
		flag = false;
		msg = { ...msg, username: "Username cannot be empty." }
	}

	if (email) {
		if (email.length === 0) {
			flag = false;
			msg = { ...msg, email: "Email cannot be empty." }
		} else {
			// eslint-disable-next-line
			let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (regex.test(String(email).toLowerCase())) {
				flag = (flag ? true : false);
				msg = { ...msg, email: "" }
			} else {
				flag = false;
				msg = { ...msg, email: "Invalid email type." }
			}
		}
	} else {
		flag = false;
		msg = { ...msg, email: "Email cannot be empty." }
	}

	if (phone) {
		if (phone.length < 10 || phone.length > 15 || isNaN(phone)) {
			flag = false;
			msg = { ...msg, phone: "Invalid phone number." }
		} else {
			flag = (flag ? true : false);
			msg = { ...msg, phone: "" }
		}
	} else {
		flag = false;
		msg = { ...msg, phone: "Phone number cannot be empty." }
	}

	if (password) {
		if (password.length < 10) {
			flag = false;
			msg = { ...msg, password: "Password too short." }
		} else {
			if (password !== rePassword) {
				flag = false;
				msg = {
					...msg,
					password: "Password and Repassword must match.",
					rePassword: "Password and Repassword must match."
				}
			} else {
				flag = (flag ? true : false);
				msg = { ...msg, password: "", rePassword: "" }
			}
		}
	} else {
		flag = false;
		msg = { ...msg, password: "Password cannot be empty." }	
	}

	if (fullname) {
		if (fullname.length === 0) {
			flag = false;
			msg = { ...msg, fullname: "Fullname cannot be empty." }
		} else {
			flag = (flag ? true : false);
			msg = { ...msg, fullname: "" }
		}
	} else {
		flag = false;
		msg = { ...msg, fullname: "Fullname cannot be empty." }	
	}

	if (gender) {
		if (gender.id) {
			flag = (flag ? true : false);
			msg = { ...msg, gender: "" }
		} else {
			flag = false;
			msg = { ...msg, gender: "Select your gender." }
		}
	} else {
		flag = false;
		msg = { ...msg, gender: "Select your gender." }	
	}

	if (addresses) {
		if (addresses.city.country.id) {
			if (addresses.city.id) {
				flag = (flag ? true : false);
				msg = {
					...msg,
					addresses: "",
					country: "",
					city: ""
				}
			} else {
				flag = false;
				msg = { ...msg, city: "Select your city." }
			}
		} else {
			flag = false;
			msg = { ...msg, country: "Select your country." }
		}
	} else {
		flag = false;
		msg = { ...msg, addresses: "You must enter your addresses informations." }
	}

	if (countryPhoneCode) {
		if (countryPhoneCode.id) {
			flag = (flag ? true : false);
			msg = { ...msg, countryPhoneCode: "" }	
		} else {
			flag = false;
			msg = { ...msg, countryPhoneCode: "Select a phone code." }
		}
	} else {
		flag = false;
		msg = { ...msg, countryPhoneCode: "Select a phone code." }
	}

	return { flag, msg };
}

export function validateCandidate(candidate) {
	if (!candidate)
		return { flag: false, msg: { } };

	let result;

	if (!(result = validateBasicAccount(candidate)).flag) {
		return result;
	}

	let flag = true;
	let msg = {};

	msg = { ...result.msg };

	let { title, dob, isOpen } = candidate;

	if (title) {
		flag = (flag ? true : false);
		msg = { ...msg, title: "" };
	} else {
		flag = false;
		msg = { ...msg, title: "Title cannot be empty." };
	}
	
	if (dob) {
		dob = (dob instanceof Date ? dob.getTime() : Date.parse(dob));

		if (dob > new Date().getTime()) {
			flag = false;
			msg = { ...msg, dob: "Invalid Date of birth." };
		} else {
			flag = (flag ? true : false);
			msg = { ...msg, dob: "" };
		}
	} else {
		flag = false;
		msg = { ...msg, dob: "Date of birth cannot be empty." };
	}

	if (isOpen !== undefined) {
		flag = (flag ? true : false);
		msg = { ...msg, isOpen: "" };
	} else {
		flag = false;
		msg = { ...msg, isOpen: "Job seeking status cannot be empty." };
	}

	return { flag, msg };
}

export function validateRecruiter(recruiter) {
	if (!recruiter)
		return { flag: false, msg: { } };

	let result;

	if (!(result = validateBasicAccount(recruiter)).flag) {
		return result;
	}

	let flag = true;
	let msg = {};

	msg = { ...result.msg };

	let { contactName, contactPhonenumber } = recruiter;

	if (contactName) {
		flag = (flag ? true : false);
		msg = { ...msg, contactName: "" };
	} else {
		flag = false;
		msg = { ...msg, contactName: "Contact name cannot be empty." };
	}

	if (contactPhonenumber) {
		if (contactPhonenumber.length < 10 || contactPhonenumber.length > 15 || isNaN(contactPhonenumber)) {
			flag = false;
			msg = { ...msg, contactPhonenumber: "Invalid contact number." }
		} else {
			flag = (flag ? true : false);
			msg = { ...msg, contactPhonenumber: "" }
		}
	} else {
		flag = false;
		msg = { ...msg, contactPhonenumber: "Phone number cannot be empty." }
	}

	return { flag, msg };
}
