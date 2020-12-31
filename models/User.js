const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		index: true,
		sparse: true
	},
	session_token: {
		access_token: {
			type: String,
			required: false
		},
		refresh_token: {
			type: String,
			required: false
		},
		valid_till: {
			type: Number, 
			required: false
		},
		_v: {
			type: Number,
			required: false,
			min: [0, "Invalid."]
		}
	}
});

module.exports = User = mongoose.model('User', UserSchema, 'users');