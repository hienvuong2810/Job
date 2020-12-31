const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	delete req.headers["x-auth-token"];

	if (!token) {
		return res.status(400).json({ msg: "Authorization denied. " });
	}

	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		req.user = decoded;
		req.token = token;
		next();
	} catch (e) {
		return res.status(401).send("Invalid token");
	}
}

module.exports = auth;
